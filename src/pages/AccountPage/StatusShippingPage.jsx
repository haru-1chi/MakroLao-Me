import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';

function StatusShippingPage() {
    const { orderId } = useParams();
    const { orders } = useCart();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return <div>Order not found</div>;
    }

    const calculateTotalBeforeDiscount = () => {
        return order.items.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    //status order
    const [currentStatus, setCurrentStatus] = useState(order.status.key);

    const events = [
        { status: 'Ordered', label: 'ได้รับคำสั่งซื้อแล้ว', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
        { status: 'preparing', label: 'จัดเตรียมคำสั่งซื้อ', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'prepared', label: 'สินค้าจัดเตรียมสำเร็จ', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'shipping', label: 'อยู่ในระหว่างการนำส่ง', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', label: 'สินค้าจัดส่งและชำระเงินสำเร็จแล้ว', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];

    const statusesOrder = events.map(event => event.status);

    const isStatusOrBefore = (status) => {
        const currentIndex = statusesOrder.indexOf(currentStatus);
        const statusIndex = statusesOrder.indexOf(status);
        return statusIndex <= currentIndex;
    };

    const customizedMarker = (item) => {
        if (isStatusOrBefore(item.status)) {
            return (
                <div className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle shadow-1" style={{ backgroundColor: item.color }}>
                    <i className={item.icon}></i>
                </div>
            );
        }
        return null;
    };

    const customizedContent = (item) => {
        return (
            <p>{item.label}</p>
        );
    };

    return (
        <>
            <div className='w-full px-5 pt-5 flex flex-column justify-content-center'>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='border-1 surface-border border-round p-3'>
                        <h2 className="m-0 mb-2 p-0">Thank you for your order!</h2>
                        <p>หมายเลขคำสั่งซื้อ {order.id}</p>
                        <p>Your order has been placed and we will start preparing soon...</p>
                        <div>
                            <p>วันที่สั่งซื้อ {order.date}</p>
                            <p>จัดส่งวัน {order.shippingTime}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full border-right-1 pl-5">
                            <p>สถานะคำสั่งซื้อ</p>
                            <Timeline value={events} align="rigth" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                        </div>
                        <div className="w-full pl-5">
                            <div>
                                <h3>ที่อยู่จัดส่ง</h3>
                                <p>ชื่อ {order.user.name}</p>
                                <p>ที่อยู่ {order.user.address} {order.user.zipcode}</p>
                                <p>{order.user.tel}</p>
                            </div>
                            <div className='mt-5'>
                                <h3>ที่อยู่ในใบเสร็จรับเงิน</h3>
                                <p>ชื่อ {order.user.name}</p>
                                <p>ที่อยู่ {order.user.address} {order.user.zipcode}</p>
                                <p>{order.user.tel}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='border-1 surface-border border-round p-3 flex justify-content-between'>
                        <div>
                            <p className="m-0 mb-2 p-0">ผู้ขาย: CP Axtra Public Company Limited. Branch ()</p>
                            <p>{order.items.length} รายการ</p>
                        </div>
                        <Button label="เพิ่มสินค้าทั้งหมดลงตะกร้า" outlined />
                    </div>
                    <h2>ที่ต้องจัดส่ง</h2>
                    <div className="flex flex-column mx-5">
                        {order.items.map((product, index) => (
                            <div key={index} className="cart-items flex justify-content-between align-items-center mb-2 border-bottom-1 surface-border">
                                <div className="flex align-items-center">
                                    <img
                                        src={product.product_image}
                                        alt={product.product_name}
                                        className="w-1 m-2"
                                    />
                                    <div className="flex flex-column">
                                        <span className="mb-3 font-bold">{product.product_name}</span>
                                        <span >{product.product_price * product.quantity} ฿</span>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-2xl'>{product.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='flex'>
                        <div className='w-full p-3'>
                            <h2 className="m-0 mb-2 p-0">ข้อมูลการชำระเงิน</h2>
                            <p>ช่องทางการชำระเงิน: ชำระเงินเมื่อจัดส่งสำเร็จ</p>
                            <p>สถานะ: {order.status.value}</p>
                        </div>
                        <div className='w-full flex flex-column p-3 bg-white border-round-mb justify-content-center'>
                            <h2 className="m-0 mb-2 p-0">สรุปคำสั่งซื้อ</h2>
                            <div className="flex align-items-center justify-content-between">
                                <p className='m-2'>ยอดรวม</p>
                                <p className='m-2'>{totalBeforeDiscount.toFixed(2)} ฿</p>
                            </div>
                            <div className="flex align-items-center justify-content-between">
                                <p className='m-2'>ค่า COD</p>
                                <p className='m-2'>{shippingCost.toFixed(2)} ฿</p>
                            </div>
                            <div className="flex align-items-center justify-content-between border-top-1 surface-border">
                                <p className='m-2'>ราคารวม</p>
                                <p className='m-2'>{totalPayable.toFixed(2)} ฿</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-center'>หากมีคำถามหรือข้อสงสัยเกี่ยวกับคำสั่งซื้อ ติดต่อฝ่ายบริการลูกค้าผ่านไลน์ @makropro หรือโทร 1432</p>
                    </div>
                </div>
            </div>
        </>

    )
}


export default StatusShippingPage