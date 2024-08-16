import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../../router/CartContext';
import { convertTHBtoLAK, formatLaosPhone } from '../../utils/DateTimeFormat';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

function CheckoutPage() {
    const navigate = useNavigate();
    const { cart, user, placeCartDetail } = useCart();
    const LaosPhone = formatLaosPhone(user.tel);
    const [taxId, setTaxId] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [shipping, setShipping] = useState('courierDelivery');
    const [selectedDelivery, setSelectedDelivery] = useState('');
    const [deliveryBranch, setDeliveryBranch] = useState('');
    const [error, setError] = useState(false);

    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateCODCost = (total) => {
        return total * 0.03;
    };
    const num_total = cart.length

    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const LaostotalBeforeDiscount = convertTHBtoLAK(calculateTotalBeforeDiscount());

    const CODCost = calculateCODCost(totalBeforeDiscount);
    const LaosCODCost = convertTHBtoLAK(calculateCODCost(totalBeforeDiscount));

    const totalPayable = totalBeforeDiscount + CODCost;
    const LaostotalPayable = convertTHBtoLAK(totalPayable)

    const deliveries = [
        { name: 'รุ่งอรุณ' },
        { name: 'อนุสิทธิ์' },
        { name: 'ไอเดีย' }
    ];
    
    const handleConfirmPayment = () => {
        if (shipping === 'courierDelivery') {
            if (!selectedDelivery || !deliveryBranch) {
                setError(true);
            } else {
                setError(false);
                const orderDetails = {
                    taxId,
                    branchCode,
                    shipping,
                    selectedDelivery,
                    deliveryBranch,
                    amountPayment: LaostotalPayable
                };
                placeCartDetail(orderDetails);
                navigate("/PaymentPage");
            }
        } else {
            const orderDetails = {
                taxId,
                branchCode,
                shipping,
                selectedDelivery,
                deliveryBranch,
                amountPayment: LaostotalPayable
            };
            placeCartDetail(orderDetails);
            navigate("/PaymentPage");
        }
    };

    return (
        <>
            <h1 className='pl-8'>ทำการสั่งซื้อ</h1>
            <div className='w-full px-8 gap-4 flex justify-content-between'>

                <div className='checkout-1'>
                    <div className='address p-3 border-1 surface-border border-round bg-white border-round-mb flex flex-column justify-content-center'>
                        <div className='flex align-items-center'>
                            <i className="m-0 mr-2 pi pi-map-marker"></i>
                            <h2 className='m-0 mb-2'>ข้อมูลผู้สั่งสินค้า</h2>
                        </div>
                        <p className='m-0'>ชื่อ: {user.name}</p>
                        <p className='m-0'>เบอร์โทร: {LaosPhone}</p>
                        {/* <p className="w-fit p-1 border-1 border-cyan-500 text-cyan-500 border-round">ที่อยู่เริ่มต้น</p> */}
                    </div>
                    <div className='tax flex flex-column p-3 border-1 surface-border border-round  bg-white border-round-mb justify-content-center'>
                        <div>
                            <h3 className='m-0  p-1'>ข้อมูลใบกำกับภาษี</h3>
                        </div>
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
                        <div className="flex flex-column">
                            {cart.map((product, index) => (
                                <div key={index} className="cart-items flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                    <div className="flex align-items-center">
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            width={50}
                                            height={50}
                                        />
                                        <div className="flex flex-column ml-3">
                                            <span className="mb-1 font-bold">{product.product_name}</span>
                                            <span>{product.product_price * product.quantity} ฿</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='text-2xl'>{product.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className='m-0 mt-3 mb-2'>วิธีการรับสินค้า</p>

                        <div className="flex gap-2 mb-2">
                            <div className="w-full flex align-items-center border-1 surface-border border-round p-2">
                                <RadioButton inputId="shipping1" name="shipping" value="courierDelivery" onChange={(e) => setShipping(e.value)} checked={shipping === 'courierDelivery'} />
                                <label htmlFor="shipping1" className="ml-2">จัดส่งโดยขนส่ง</label>
                            </div>
                            <div className="w-full flex align-items-center border-1 surface-border border-round p-2">
                                <RadioButton inputId="shipping2" name="shipping" value="selfPickup" onChange={(e) => setShipping(e.value)} checked={shipping === 'selfPickup'} />
                                <label htmlFor="shipping2" className="ml-2">รับเองที่บริษัท</label>
                            </div>
                        </div>
                        <div className='flex flex-column border-1 surface-border border-round justify-content-center p-2'>
                            {shipping === 'courierDelivery' ? (
                                <div className="">
                                    <p className='m-0 mb-2'>เลือกขนส่งและระบุสาขา</p>
                                    <div className=''>
                                        <div className="flex gap-2">
                                            <Dropdown
                                                value={selectedDelivery}
                                                onChange={(e) => setSelectedDelivery(e.value)}
                                                options={deliveries}
                                                optionLabel="name"
                                                placeholder="เลือกขนส่ง"
                                                className="w-full"
                                            />
                                            <InputText
                                                className="w-full border-round p-3"
                                                value={deliveryBranch}
                                                onChange={(e) => setDeliveryBranch(e.target.value)}
                                                placeholder='ระบุสาขาขนส่ง'
                                            />

                                        </div>
                                        <div className="flex gap-2">
                                            {error && !selectedDelivery && <small className="p-error w-full">กรุณาระบุชื่อขนส่ง</small>}
                                            {error && !deliveryBranch && <small className="p-error w-full">กรุณาระบุสาขาขนส่ง</small>}
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className='m-0'>รับสินค้าที่: โกดัง</p>
                                    <p className='m-0'>ที่อยู่โกดัง</p>
                                </div>
                            )}

                        </div>
                        <div className='flex justify-content-end'>
                            <p className='m-0 mt-3'>ยอดสั่งซื้อ {num_total} รายการ: {Number(totalBeforeDiscount.toFixed(2)).toLocaleString('en-US')} ฿</p>
                        </div>
                        <div className='flex justify-content-end'>
                            <p className='m-0'>ค่า COD 3%: {Number(CODCost.toFixed(2)).toLocaleString('en-US')} ฿</p>
                        </div>
                    </div>
                </div>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                    <div className="flex justify-content-between pb-3 border-bottom-1 surface-border">
                        <p className='m-0 text-start'>ยอดสั่งซื้อ</p>
                        <div className="flex flex-column gap-1">
                            <p className='m-0 text-right'>{Number(totalBeforeDiscount.toFixed(2)).toLocaleString('en-US')} ฿</p>
                            <p className='m-0 text-right font-bold'>{Number(LaostotalBeforeDiscount.toFixed(2)).toLocaleString('en-US')} ₭</p>
                        </div>

                    </div>
                    <div className="flex justify-content-between pb-3 border-bottom-1 surface-border">
                        <p className='m-0'>ค่า COD 3%</p>
                        <div className="flex flex-column gap-1">
                            <p className='m-0 text-right'>{Number(CODCost.toFixed(2)).toLocaleString('en-US')} ฿</p>
                            <p className='m-0 text-right font-bold'>{Number(LaosCODCost.toFixed(2)).toLocaleString('en-US')} ₭</p>
                        </div>
                    </div>
                    <div className="flex justify-content-between pb-3 border-bottom-1 surface-border">
                        <p className='m-0'>ยอดชำระ</p>
                        <div className="flex flex-column gap-1">
                            <p className='m-0 text-right'>{Number(totalPayable.toFixed(2)).toLocaleString('en-US')} ฿</p>
                            <p className='m-0 text-right text-primary font-bold'>{Number(LaostotalPayable.toFixed(2)).toLocaleString('en-US')} ₭</p>
                        </div>
                    </div>
                    <Button className="w-full" label="ไปหน้าชำระสินค้า" size="small" rounded onClick={handleConfirmPayment} />


                </div>
            </div >
        </>
    )
}

export default CheckoutPage