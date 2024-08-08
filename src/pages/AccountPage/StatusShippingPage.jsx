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
    const [currentStatus, setCurrentStatus] = useState('Processed');

    const events = [
        { status: 'Ordered', label: 'ได้รับคำสั่งซื้อแล้ว', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', label: 'จัดเตรียมคำสั่งซื้อ', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Processed', label: 'สินค้าจัดเตรียมสำเร็จ', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Shipped', label: 'อยู่ในระหว่างการนำส่ง', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
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
                <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                    <i className={item.icon}></i>
                </span>
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
                            <p>จัดส่งวัน {order.deliveryDate}</p>
                        </div>
                    </div>
                    <div className="flex mx-5">
                        <div className="card">
                            <p>สถานะคำสั่งซื้อ</p>
                            <Timeline value={events} align="rigth" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                        </div>
                        <div>
                            <div>
                                <p>ที่อยู่จัดส่ง {order.shippingAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='border-1 surface-border border-round p-3 flex justify-content-between'>
                        <div>
                            <p className="m-0 mb-2 p-0">ผู้ขาย: CP Axtra Public Company Limited. Branch ()</p>
                            <p>รายการ</p>
                        </div>
                        <Button label="เพิ่มสินค้าทั้งหมดลงตะกร้า" outlined />
                    </div>
                    <h2>ที่ต้องจัดส่ง</h2>
                    <div className="flex flex-column mx-5">
                        {order.items.map((product, index) => (
                            <div key={index} className="cart-items flex justify-content-between mb-2 border-bottom-1">
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
                        <div className='border-1 surface-border border-round p-3'>
                            <h2 className="m-0 mb-2 p-0">ข้อมูลการชำระเงิน</h2>
                            <p>ช่องทางการชำระเงิน: ชำระเงินเมื่อจัดส่งสำเร็จ</p>
                            <p>สถานะ: ต้องชำระเงิน</p>
                        </div>
                        <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                            <div className="flex align-items-center justify-content-between">
                                <p className='m-0'>ยอดสั่งซื้อก่อนหักส่วนลด</p>
                                <p className='m-0'>{totalBeforeDiscount.toFixed(2)} ฿</p>
                            </div>
                            <div className="flex align-items-center justify-content-between">
                                <p className='m-0'>จัดส่ง</p>
                                <p className='m-0'>{shippingCost.toFixed(2)} ฿</p>
                            </div>
                            <div className="flex align-items-center justify-content-between">
                                <p className='m-0'>ยอดชำระ</p>
                                <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex mx-5">
                        <p>หากมีคำถามหรือข้อสงสัยเกี่ยวกับคำสั่งซื้อ ติดต่อฝ่ายบริการลูกค้าผ่านไลน์ @makropro หรือโทร 1432</p>
                    </div>
                </div>
            </div>
        </>

    )
}


export default StatusShippingPage