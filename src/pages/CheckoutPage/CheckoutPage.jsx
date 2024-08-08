import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { RadioButton } from 'primereact/radiobutton';
import { Outlet, Link } from "react-router-dom";

function CheckoutPage() {
    const { cart } = useCart();
    const [value, setValue] = useState('');
    const [shipping, setShipping] = useState('');

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

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
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

                            <p className='m-0'>firstname lastname, tel</p>
                            <p className='m-0'>address</p>
                            <div>
                                <p>ที่อยู่เริ่มต้น</p>
                            </div>
                        </div>
                        <div className='tax flex flex-column p-3 border-1 surface-border border-round  bg-white border-round-mb justify-content-center'>
                            <h2 className='m-0'>ที่อยู่สำหรับใบกำกับภาษี</h2>
                            <div>
                                <h3 className='p-1'>ใช้ที่อยู่เดียวกับที่อยู่สำหรับจัดส่ง</h3>
                            </div>
                            <Button label="+ เพิ่มที่อยู่ใหม่" text />
                            <div className='flex gap-2'>
                                <InputText className="w-full border-round p-3" value={value} onChange={(e) => setValue(e.target.value)} placeholder='เลขประจำตัวผู้เสียภาษี (ถ้ามี)' />
                                <InputText className="w-full border-round p-3" value={value} onChange={(e) => setValue(e.target.value)} placeholder='รหัสสาขา (ถ้ามี)' />
                            </div>
                        </div>
                        <div className='tax flex flex-column p-3 border-1 surface-border border-round  bg-white border-round-mb justify-content-center'>
                            <h2 className='m-0 mb-2'>สรุปสินค้าและการจัดส่ง</h2>
                            <div className='flex align-items-center justify-content-between border-1 surface-border border-round p-2 mb-5'>
                                <h4 className='m-0'>Makro Pro</h4>
                                <p className='m-0'>{num_total} รายการ</p>
                            </div>
                            <div className="flex p-0 ">
                                {cart.map((product, index) => (
                                    <div key={index} className="cart-items p-0 m-0 mb-2">
                                        <div className="flex p-0 m-0 align-items-center">
                                            <img
                                                src={product.product_image}
                                                alt={product.product_name}
                                                className="w-2 p-0 m-0 m-2"
                                            />
                                            <p className="m-0 p-0 mx-2">{product.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className='m-0'>วิธีการจัดส่ง</p>
                            <div className="flexjustify-content-between mb-2">
                                <div className="flex align-items-center">
                                    <RadioButton inputId="shipping" name="shipping" value="จัดส่ง" onChange={(e) => setShipping(e.value)} checked={shipping === 'จัดส่ง'} />
                                    <label htmlFor="shipping" className="ml-2">จัดส่ง</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="shipping" name="shipping" value="รับที่สาขา" onChange={(e) => setShipping(e.value)} checked={shipping === 'รับที่สาขา'} />
                                    <label htmlFor="shipping" className="ml-2">รับที่สาขา</label>
                                </div>
                            </div>
                            <div className='flex border-1 surface-border border-round align-items-center justify-content-between p-2'>
                                <div>
                                    <p className='m-0'>จัดส่งโดย แม็คโคร โปร</p>
                                    <p className='m-0'>ได้รับภายใน: time</p>
                                </div>
                                <Button label="เลือกเวลาใหม่" size="small" rounded />
                            </div>
                            <div className='flex justify-content-end'>
                                <p className='m-0 mt-3'>ยอดสั่งซื้อ {num_total} รายการ: 1,262 บาท</p>
                            </div>
                            <div className='flex justify-content-end'>
                                <p className='m-0'>ค่าจัดส่ง: {shippingCost.toFixed(2)} ฿</p>
                            </div>
                        </div>
                    </div>
                    <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                        <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>ยอดสั่งซื้อก่อนหักส่วนลด</p>
                            <p className='m-0'>{totalBeforeDiscount.toFixed(2)} ฿</p>
                        </div>
                        <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>จัดส่ง</p>
                            <p className='m-0'>{shippingCost.toFixed(2)} ฿</p>
                        </div>
                        <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>ยอดชำระ</p>
                            <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
                        </div>
                        <Link to="/PaymentPage"><Button label="ไปหน้าชำระสินค้า" size="small" rounded /></Link>

                    </div>
                </div>
        </>
    )
}

export default CheckoutPage