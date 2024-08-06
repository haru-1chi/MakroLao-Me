import React from 'react'

function CheckoutPage() {
    return (
        <div className='flex justify-content-center'>
            <div>
                <h1>ทำการสั่งซื้อ</h1>
                <div className='address border-1'>
                    <h2>ที่อยู่สำหรับจัดส่ง</h2>
                    <p>first_name, last_name, tel</p>
                    <p>address</p>
                    <div>
                        <p>ที่อยู่เริ่มต้น</p>
                    </div>
                </div>
                <div className='tax flex flex-column'>
                    <h2>ที่อยู่สำหรับใบกำกับภาษี</h2>
                    <div>
                        <h3>ใช้ที่อยู่เดียวกับที่อยู่สำหรับจัดส่ง</h3>
                    </div>
                    <button>
                        + เพิ่มที่อยู่ใหม่
                    </button>
                    <input type="text" placeholder='เลขประจำตัวผู้เสียภาษี (ถ้ามี)' />
                    <input type="text" placeholder='รหัสสาขา (ถ้ามี)' />
                </div>
                <div className=''>
                    <h2>สรุปสินค้าและการจัดส่ง</h2>
                    <div>
                        <h1>Makro Pro</h1>
                        <p>num_total รายการ</p>
                    </div>
                    {/* map โชว์รูปเรียงกันในแนว x ขึ้นจำนวนมุมขวาล่าง */}
                    <p>วิธีการจัดส่ง</p>
                    {/* radio */}
                    <div>
                        <div>
                            <p>จัดส่งโดย แม็คโคร โปร</p>
                            <p>ได้รับภายใน: time</p>
                        </div>
                        <button>เลือกเวลาใหม่</button>
                    </div>
                    <div>
                        <p>ยอดสั่งซื้อ 4 รายการ: 1,262 บาท</p>
                        <p>ค่าจัดส่ง: 3%</p>
                    </div>
                </div>
            </div>
            <div>
                <p>ยอดสั่งซื้อก่อนหักส่วนลด</p>
                <p>จัดส่ง 3%</p>
                <p>ส่วนลด -87.00 ฿</p>
                <p>ยอดชำระ 1,175.00 ฿</p>
                <button>ไปหน้าชำระสินค้า</button>
            </div>
        </div>
    )
}

export default CheckoutPage