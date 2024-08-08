import React, { useState } from "react";
import { useCart } from '../../router/CartContext';
import { Outlet, Link } from "react-router-dom";
import { Button } from "primereact/button";
function PaymentPage() {
    const { cart } = useCart();
    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    return (
        <>
            <h2 className="flex justify-content-center px-8">เลือกช่องทางชำระเงิน</h2>
            <div className='w-full px-8 flex justify-content-center'>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                    <div className="border-1 surface-border border-round p-2 flex flex-column">
                        <i className="pi pi-truck"></i>
                        <p className='m-0'>ชำระเงินเมื่อจัดส่งสำเร็จ</p>
                        <p className='m-0'>*เฉพาะผู้ชำระผ่าน บัตรเครดิต ธนาคารออนไลน์ หรือ ทรูมันนี่ วอลเลต</p>
                    </div>
                    <div className="border-1 surface-border border-round p-2 flex flex-column">
                        <i className="pi pi-credit-card"></i>
                        <p className='m-0'>บัตรเครดิต / เดบิต</p>
                        <p className='m-0'>บันทึกข้อมูลบัตรไว้ เพื่อเพิ่มความสะดวก</p>
                    </div>
                    <Link to="/QRPage">
                        <div className="border-1 surface-border border-round p-2 flex flex-column">
                            <i className="pi pi-building-columns"></i>
                            <p className='m-0'>โอนชำระผ่านธนาคาร</p>
                            <p className='m-0'>ชำระผ่านรหัสอ้างอิงที่เคาน์เตอร์ธนาคาร ตู้เอทีเอ็ม หรือ แอปธนาคาร</p>
                        </div>
                    </Link>
                    <div className="border-1 surface-border border-round p-2 flex flex-column">
                        <i className="pi pi-wallet"></i>
                        <p className='m-0'>ทรูมันนี่ วอลเล็ต</p>
                        <p className='m-0'>*เติมเงินกับทรูมันนี่ให้เพียงพอต่อการใช้จ่าย</p>
                    </div>
                    <div className="border-1 surface-border border-round p-2 flex flex-column">
                        <i className="pi pi-credit-card"></i>
                        <p className='m-0'>ผ่านชำระผ่านบัตรเครดิต</p>
                    </div>
                    <div className="p-2 flex flex-column">
                        <p className='m-0'>ยอด</p>
                        <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PaymentPage