import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";

function AccountPage() {
    const { cart, orders, clearOrder } = useCart();

    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    const statusCounts = orders.reduce((counts, order) => {
        counts[order.status.key] = (counts[order.status.key] || 0) + 1;
        return counts;
    }, {});

    return (
        <>
            <div className="flex my-5 mx-8">
                <div className="checkout-2 bg-white border-1 surface-border border-round-xl mr-5">
                    <ul >
                        <li className='list-none py-3'>บัญชีของฉัน</li>
                        <li className='list-none py-3'>ประวัติการสั่งซื้อ</li>
                        <li className='list-none py-3'>รายการโปรด</li>
                        <li className='list-none py-3'>จัดการข้อมูลส่วนบุคคล</li>
                        <li className='list-none py-3' onClick={clearOrder}>*ติดต่อเรา</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h2 className="m-0 mb-2 p-0">ประวัติการสั่งซื้อ</h2>
                    <ul className='w-full flex justify-content-between'>
                        <li className='list-none'>ทั้งหมด {orders.length}</li>
                        <li className='list-none'>ต้องชำระเงิน {statusCounts['pending'] || ''}</li>
                        <li className='list-none'>กำลังจัดเตรียม {statusCounts['preparing'] || ''}</li>
                        <li className='list-none'>กำลังจัดส่ง {statusCounts['shipping'] || ''}</li>
                        <li className='list-none'>จัดส่งสำเร็จ {statusCounts['Delivered'] || ''}</li>
                        <li className='list-none'>ถูกยกเลิก {statusCounts['cancelled'] || ''}</li>
                    </ul>
                    {orders.map((order, index) => (
                        <Link to={`/StatusShippingPage/${order.id}`} key={order.id} className='no-underline'>
                            <div className='checkout-3 w-full bg-white border-1 surface-border border-round-xl py-5 px-3 mt-3 align-items-center'>
                                <div className='w-full'>
                                    <p className="m-0 p-0">#รหัสใบเสร็จ {order.id}</p>
                                    <p className="m-0 p-0">Makro PRO</p>
                                </div>
                                <div>
                                    <div className="w-full flex flex-wrap text-center gap-2">
                                        {order.items.map((product, index) => (
                                            <div key={index} className="cart-items p-0 m-0 mb-2 ">
                                                <div className="block">
                                                    <img
                                                        src={product.product_image}
                                                        alt={product.product_name}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='w-full justify-contend-center'>
                                    <p className="m-0 p-0">{order.status.value}</p>
                                    <p className="m-0 p-0">{order.shippingTime}</p>
                                </div>
                                <div className='w-full'>
                                    <p className="m-0 p-0 text-right">{order.total} ฿</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>

    )
}


export default AccountPage