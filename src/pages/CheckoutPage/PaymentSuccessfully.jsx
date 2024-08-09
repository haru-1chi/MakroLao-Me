import React from 'react'
import { Button } from "primereact/button";
import { Outlet, Link } from "react-router-dom";
function PaymentSuccessfully() {
    return (
        <>
            <div className='w-full px-5 pt-5 flex justify-content-center'>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <h2 className="m-0 p-0">ทำการสั่งซื้อ</h2>
                    <div className="flex justify-content-center">
                        <img
                            src=""
                            alt=""
                            className="w-2 p-8 m-0 m-2 border-1"
                        />
                    </div>
                    <h2 className="text-center">การสั่งซื้อสำเร็จแล้ว!</h2>
                    <p className="text-center">เราจะจัดเตรียมรายการสินค้าของคุณและจัดส่งอย่างตรงเวลา!</p>
                    <div className="flex align-items-center justify-content-center">
                        <Link to="/AccountPage" ><Button label="ดูรายการสั่งซื้อ" size="small" rounded /></Link>
                    </div>
                    <div className="flex align-items-center justify-content-center">
                        <Link to="/"><Button label="เลือกสินค้าเพิ่มเติม" size="small" rounded /></Link>
                    </div>

                </div>

            </div>
        </>

    )
}


export default PaymentSuccessfully