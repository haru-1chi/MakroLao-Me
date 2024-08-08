// //OrderSummaryPage.jsx
// import React from "react";
// import { useCart } from './CartContext';
// import { Link } from "react-router-dom";

// function OrderSummaryPage() {
//     const { cart, clearCart } = useCart();

//     const calculateTotalBeforeDiscount = () => {
//         return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
//     };

//     const calculateShippingCost = (total) => {
//         return total * 0.03;
//     };

//     const totalBeforeDiscount = calculateTotalBeforeDiscount();
//     const shippingCost = calculateShippingCost(totalBeforeDiscount);
//     const totalPayable = totalBeforeDiscount + shippingCost;

//     const handleOrderConfirmation = () => {
//         // Handle order confirmation logic here
//         clearCart();
//     };

//     return (
//         <>
//             <h1 className='pl-8'>สรุปคำสั่งซื้อ</h1>
//             <div className='w-full px-8 gap-4 flex flex-column'>
//                 <div className='summary-1'>
//                     <h2>รายละเอียดการจัดส่ง</h2>
//                     <div className='p-3 border-1 surface-border border-round bg-white border-round-mb'>
//                         <p>ชื่อ: firstname lastname</p>
//                         <p>ที่อยู่: address</p>
//                         <p>เบอร์โทร: tel</p>
//                     </div>
//                 </div>
//                 <div className='summary-2'>
//                     <h2>สินค้าในคำสั่งซื้อ</h2>
//                     <div className='p-3 border-1 surface-border border-round bg-white border-round-mb'>
//                         {cart.map((product, index) => (
//                             <div key={index} className="flex justify-content-between mb-2 border-bottom-1">
//                                 <div className="flex align-items-center">
//                                     <img
//                                         src={product.product_image}
//                                         alt={product.product_name}
//                                         className="w-4 m-2"
//                                     />
//                                     <div className="flex flex-column">
//                                         <span className="mb-3 font-bold">{product.product_name}</span>
//                                         <span>{product.product_price} ฿ x {product.quantity}</span>
//                                     </div>
//                                 </div>
//                                 <div>{(product.product_price * product.quantity).toFixed(2)} ฿</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='summary-3'>
//                     <h2>สรุปการชำระเงิน</h2>
//                     <div className='p-3 border-1 surface-border border-round bg-white border-round-mb'>
//                         <div className='flex align-items-center justify-content-between border-bottom-1'>
//                             <p className='m-0'>ยอดสั่งซื้อก่อนหักส่วนลด</p>
//                             <p className='m-0'>{totalBeforeDiscount.toFixed(2)} ฿</p>
//                         </div>
//                         <div className='flex align-items-center justify-content-between border-bottom-1'>
//                             <p className='m-0'>จัดส่ง</p>
//                             <p className='m-0'>{shippingCost.toFixed(2)} ฿</p>
//                         </div>
//                         <div className='flex align-items-center justify-content-between border-bottom-1'>
//                             <p className='m-0'>ยอดชำระ</p>
//                             <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
//                         </div>
//                     </div>
//                 </div>
//                 <Link to="/">
//                     <button className="w-full p-3 mt-4 bg-primary border-none text-white border-round" onClick={handleOrderConfirmation}>ยืนยันคำสั่งซื้อ</button>
//                 </Link>
//             </div>
//         </>
//     );
// }

// export default OrderSummaryPage;


import React, { useState } from 'react'; 
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function TemplateDemo() {
    const [currentStatus, setCurrentStatus] = useState('Delivered');

    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
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
        if (isStatusOrBefore(item.status)) {
            return (
                <Card title={item.status} subTitle={item.date}>
                    { item.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} width={200} className="shadow-1" />}
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
                    <Button label="Read more" className="p-button-text"></Button>
                </Card>
            );
        }
        return null;
    };

    return (
        <div className="card">
            <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
        </div>
    )
}