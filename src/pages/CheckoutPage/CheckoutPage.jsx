import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { RadioButton } from 'primereact/radiobutton';
import { Link } from "react-router-dom";

function CheckoutPage() {
    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        const formattedDate = new Intl.DateTimeFormat('th-TH', options).format(date);

        const [weekday, day, month, year, time] = formattedDate.split(' ');
        const [hour, minute] = time.split(':');

        return `${weekday} ${day} ${month} ${parseInt(year)} ${hour}.${minute}`;
    };

    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}.${minutes}`;
    }


    const { cart, user, placeCartDetail} = useCart();
    const [taxId, setTaxId] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [shipping, setShipping] = useState('จัดส่ง');


    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const num_total = cart.length
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    //set time
    const [deliveryDate, setDeliveryDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Set delivery date to the next day
        return date;
    });
    const [deliveryTime, setDeliveryTime] = useState(() => {
        const date = new Date();
        date.setHours(date.getHours() + 4); // Set time to 4 hours from now
        return date;
    });

    const handleConfirmPayment = () => {
        const orderDetails = {
            taxId: taxId,
            branchCode: branchCode,
            shipping: shipping,
            shippingTime: `${formatDate(deliveryDate)} - ${formatTime(deliveryTime)}`,
        };
        placeCartDetail(orderDetails);
    };

    return (
        <>
            <h1 className='pl-8'>ทำการสั่งซื้อ</h1>
            <div className='w-full px-8 gap-4 flex justify-content-between'>

                <div className='checkout-1'>
                    <div className='address p-3 border-1 surface-border border-round bg-white border-round-mb flex flex-column justify-content-center'>
                        <div className='flex align-items-center'>
                            <i className="m-0 mr-2 pi pi-map-marker"></i>
                            <h2 className='m-0 mb-2'>ที่อยู่สำหรับจัดส่ง</h2>
                        </div>
                        <p className='m-0'>{user.name}, {user.tel}</p>
                        <p className='m-0'>{user.address}</p>
                        <p className="w-fit p-1 border-1 border-cyan-500 text-cyan-500 border-round">ที่อยู่เริ่มต้น</p>
                    </div>
                    <div className='tax flex flex-column p-3 border-1 surface-border border-round  bg-white border-round-mb justify-content-center'>
                        <h2 className='m-0'>ที่อยู่สำหรับใบกำกับภาษี</h2>
                        <div>
                            <h3 className='p-1'>ใช้ที่อยู่เดียวกับที่อยู่สำหรับจัดส่ง</h3>
                        </div>
                        <Button label="+ เพิ่มที่อยู่ใหม่" text />
                        <div className='flex gap-2'>
                            <InputText className="w-full border-round p-3" value={taxId} onChange={(e) => setTaxId(e.target.value)} placeholder='เลขประจำตัวผู้เสียภาษี (ถ้ามี)' />
                            <InputText className="w-full border-round p-3" value={branchCode} onChange={(e) => setBranchCode(e.target.value)} placeholder='รหัสสาขา (ถ้ามี)' />
                        </div>
                    </div>
                    <div className='tax flex flex-column p-3 border-1 surface-border border-round  bg-white border-round-mb justify-content-center'>
                        <h2 className='m-0 mb-2'>สรุปสินค้าและการจัดส่ง</h2>
                        <div className='flex align-items-center justify-content-between border-1 surface-border border-round p-2 mb-2'>
                            <h4 className='m-0'>Makro Pro</h4>
                            <p className='m-0'>{num_total} รายการ</p>
                        </div>
                        <div className="flex flex-wrap">
                            {cart.map((product, index) => (
                                <div key={index} className="cart-items mb-2">
                                    <div className="flex flex-wrap align-items-center">
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <img
                                                src={product.product_image}
                                                alt={product.product_name}
                                                className="border-1 surface-border border-round m-2"
                                                width={60}
                                                height={60}
                                            />
                                            <p className="mx-2" style={{
                                                position: 'absolute',
                                                bottom: '-0.25rem',
                                                right: '0px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                color: 'white',
                                                fontSize: '1rem',
                                                padding: '0.2rem 0.5rem ',
                                                borderRadius: '0.25rem'
                                            }}>{product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className='m-0 mb-2'>วิธีการจัดส่ง</p>
                        <div className="flex gap-2 mb-2">
                            <div className="w-full flex align-items-center border-1 surface-border border-round p-2">
                                <RadioButton inputId="shipping1" name="shipping" value="จัดส่ง" onChange={(e) => setShipping(e.value)} checked={shipping === 'จัดส่ง'} />
                                <label htmlFor="shipping1" className="ml-2">จัดส่ง</label>
                            </div>
                            <div className="w-full flex align-items-center border-1 surface-border border-round p-2">
                                <RadioButton inputId="shipping2" name="shipping" value="รับที่สาขา" onChange={(e) => setShipping(e.value)} checked={shipping === 'รับที่สาขา'} />
                                <label htmlFor="shipping2" className="ml-2">รับที่สาขา</label>
                            </div>
                        </div>
                        <div className='flex border-1 surface-border border-round align-items-center justify-content-between p-2'>
                            <div>
                                <p className='m-0'>
                                    {shipping === 'จัดส่ง' ? 'จัดส่งโดย แม็คโคร โปร' : 'วันและเวลารับสินค้าของฉัน'}
                                </p>
                                <p className='m-0'>
                                    {shipping === 'จัดส่ง'
                                        ? `ได้รับภายใน: ${formatDate(deliveryDate)} - ${formatTime(deliveryTime)}`
                                        : `${formatDate(deliveryDate)} - ${formatTime(deliveryTime)}`
                                    }
                                </p>
                            </div>
                            <Button label="เลือกเวลาใหม่" size="small" rounded />
                        </div>
                        <div className='flex justify-content-end'>
                            <p className='m-0 mt-3'>ยอดสั่งซื้อ {num_total} รายการ: {totalBeforeDiscount.toFixed(2)} บาท</p>
                        </div>
                        <div className='flex justify-content-end'>
                            <p className='m-0'>ค่าจัดส่ง: {shippingCost.toFixed(2)} ฿</p>
                        </div>
                    </div>
                </div>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                    <div className="flex align-items-center justify-content-between pb-3 border-bottom-1 surface-border">
                        <p className='m-0'>ยอดสั่งซื้อก่อนหักส่วนลด</p>
                        <p className='m-0 '>{totalBeforeDiscount.toFixed(2)} ฿</p>
                    </div>
                    <div className="flex align-items-center justify-content-between pb-3 border-bottom-1 surface-border">
                        <p className='m-0'>จัดส่ง</p>
                        <p className='m-0'>{shippingCost.toFixed(2)} ฿</p>
                    </div>
                    <div className="flex align-items-center justify-content-between pb-3 border-bottom-1 surface-border">
                        <p className='m-0'>ยอดชำระ</p>
                        <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
                    </div>
                    <Link to="/PaymentPage"><Button className="w-full" label="ไปหน้าชำระสินค้า" size="small" rounded onClick={handleConfirmPayment} /></Link>


                </div>
            </div>
        </>
    )
}

export default CheckoutPage