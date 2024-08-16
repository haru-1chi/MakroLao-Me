import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";

function AccountPage() {
    const { orders, clearOrder } = useCart();
    const [activeOrderStatus, setActiveOrderStatus] = useState('all');

    const statusCounts = orders.reduce((counts, order) => {
        counts[order.status.key] = (counts[order.status.key] || 0) + 1;
        return counts;
    }, {});

    const filteredOrders = activeOrderStatus === 'all'
        ? orders
        : orders.filter(order => order.status.key === activeOrderStatus);

    const StatusBar = () => (
        <ul className='status-bar w-full flex justify-content-between'>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'all' ? 'border-bottom-2' : ''}`}
                onClick={() => setActiveOrderStatus('all')}>
                ทั้งหมด {orders.length}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'pending' ? 'border-bottom-2' : ''}`}
                onClick={() => setActiveOrderStatus('pending')}>
                ต้องชำระเงิน {statusCounts['pending'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'Ordered' ? 'border-bottom-2' : ''}`}
                onClick={() => setActiveOrderStatus('Ordered')}>
                กำลังจัดเตรียม {statusCounts['Ordered'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'shipping' ? 'border-bottom-2' : ''}`}
                onClick={() => setActiveOrderStatus('shipping')}>
                กำลังจัดส่ง {statusCounts['shipping'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'Delivered' ? 'border-bottom-2' : ''}`}
                onClick={() => setActiveOrderStatus('Delivered')}>
                จัดส่งสำเร็จ {statusCounts['Delivered'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'cancelled' ? 'border-bottom-2' : ''}`}
                onClick={() => setActiveOrderStatus('cancelled')}>
                ถูกยกเลิก {statusCounts['cancelled'] || ''}
            </li>
        </ul>
    );


    const OrderList = () => (
        filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
                <Link to={`/StatusShippingPage/${order.id}`} key={order.id} className='no-underline text-900'>
                    <OrderItem order={order} />
                </Link>
            ))
        ) : (
            <div className='h-full text-center align-content-center'>
                <h2>ยังไม่มีรายการสั่งซื้อขณะนี้</h2>
                <p className='mb-5'>คุณจะเห็นคำสั่งซื้อเมื่อมีคำสั่งซื้อที่ตรงตามเมนูสถานะที่คุณเลือก</p>
                <Link to="/"><Button label="หาจากหมวดหมู่สินค้า" rounded /></Link>
            </div>
        )
    );

    const OrderItem = ({ order }) => (
        <div className='checkout-3 w-full bg-white border-1 surface-border border-round-xl py-5 px-3 mt-3 align-items-start'>
            <div className='w-full'>
                <p className="m-0 p-0">#รหัสใบเสร็จ {order.id}</p>
                <p className="m-0 p-0">Makro PRO</p>
            </div>
            <div>
                <div className="w-full flex flex-column text-left gap-2">
                    {order.items.map((product, index) => (
                        <div key={index} className="cart-items flex justify-content-between align-items-center mb-2 border-bottom-1 surface-border">
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
            </div>
            <div className='w-full justify-content-center'>
                <p className="m-0 p-0">{order.status.value}</p>
                <p className="m-0 p-0">{order.date}</p>
            </div>
            <div className='w-full'>
                <p className="m-0 p-0 text-right">{order.totalPayable?.toLocaleString('en-US')} ₭</p>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex my-5 mx-8">
                <div className="checkout-2 bg-white border-1 surface-border border-round-xl mr-5">
                    <ul>
                        <li className='list-none py-3'>บัญชีของฉัน</li>
                        <li className='list-none py-3'>ประวัติการสั่งซื้อ</li>
                        <li className='list-none py-3'>รายการโปรด</li>
                        <li className='list-none py-3'>จัดการข้อมูลส่วนบุคคล</li>
                        <li className='list-none py-3' onClick={clearOrder}>*ติดต่อเรา</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h2 className="m-0 mb-2 p-0">ประวัติการสั่งซื้อ</h2>
                    <StatusBar />
                    <OrderList />
                </div>
            </div>
        </>

    )
}


export default AccountPage