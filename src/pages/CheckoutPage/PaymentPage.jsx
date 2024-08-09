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
                <div className="checkout-2 flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb">
                    <div className="border-1 surface-border border-round p-2 flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-truck text-2xl mr-3"></i>
                            <div>
                                <p className='m-0 font-bold'>ชำระเงินเมื่อจัดส่งสำเร็จ</p>
                                <p className='m-0 text-sm'>*เฉพาะผู้ชำระผ่าน บัตรเครดิต ธนาคารออนไลน์ หรือ ทรูมันนี่ วอลเลต</p>
                            </div>
                        </div>
                        <i className="pi pi-angle-right text-2xl"></i>
                    </div>
                    <div className="border-1 surface-border border-round p-2 flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-credit-card text-2xl mr-3"></i>
                            <div>
                                <p className='m-0 font-bold'>บัตรเครดิต / เดบิต</p>
                                <p className='m-0 text-sm'>บันทึกข้อมูลบัตรไว้ เพื่อเพิ่มความสะดวก</p>
                            </div>
                        </div>
                        <i className="pi pi-angle-right text-2xl text-right"></i>
                    </div>

                    <Link to="/QRPage" className="no-underline">
                        <div className="border-1 surface-border border-round p-2 flex align-items-center justify-content-between">
                            <div className="flex align-items-center">
                                <i className="pi pi-building-columns text-2xl mr-3"></i>
                                <div>
                                    <p className='m-0 font-bold'>โอนชำระผ่านธนาคาร</p>
                                    <p className='m-0 text-sm'>ชำระผ่านรหัสอ้างอิงที่เคาน์เตอร์ธนาคาร ตู้เอทีเอ็ม หรือ แอปธนาคาร</p>
                                </div>
                            </div>
                            <i className="pi pi-angle-right text-2xl text-right"></i>
                        </div>
                    </Link>
                    <div className="border-1 surface-border border-round p-2 flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-wallet text-2xl mr-3"></i>
                            <div>
                                <p className='m-0 font-bold'>ทรูมันนี่ วอลเล็ต</p>
                                <p className='m-0 text-sm'>*เติมเงินกับทรูมันนี่ให้เพียงพอต่อการใช้จ่าย</p>
                            </div>
                        </div>
                        <i className="pi pi-angle-right text-2xl text-right"></i>
                    </div>
                    <div className="border-1 surface-border border-round p-2 flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-credit-card text-2xl mr-3"></i>
                            <div>
                                <p className='m-0 font-bold'>ผ่านชำระผ่านบัตรเครดิต</p>
                            </div>
                        </div>
                        <i className="pi pi-angle-right text-2xl text-right"></i>
                    </div>
                    <div className="mt-3 flex flex-column">
                        <p className='m-0'>ยอด</p>
                        <p className='m-0 font-bold text-xl'>{totalPayable.toFixed(2)} ฿</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PaymentPage