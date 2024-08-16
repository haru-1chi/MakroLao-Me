import React, { useState, useRef} from 'react';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";
import { Timeline } from 'primereact/timeline';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';

function StatusShippingPage({ orderId }) {
    const { orders } = useCart();
    const order = orders.find(o => o.id === orderId);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [amount, setAmount] = useState(null);
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    if (!order) {
        return <div>Order not found</div>;
    }

    const calculateTotalBeforeDiscount = () => {
        return order.items.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateCODCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const CODCost = calculateCODCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + CODCost;

    //status order
    // const [currentStatus, setCurrentStatus] = useState(order.status.key) pi pi-check-circle;
    const [currentStatus, setCurrentStatus] = useState('Received');
    const events = [
        ...(order.PaymentChannel === 'bankCounter' ? [
            { status: 'PendingPayment', label: 'รอชำระเงิน', icon: 'pi pi-hourglass', color: '#607D8B' }
        ] : []),
        { status: 'PendingVerification', label: 'รอตรวจสอบ', icon: 'pi pi-hourglass', color: '#607D8B' },
        { status: 'Preparing', label: 'กำลังจัดเตรียมสินค้า', icon: 'pi pi-cart-arrow-down', color: '#607D8B' },
        { status: 'Packaged', label: 'จัดเตรียมสินค้าเสร็จ', icon: 'pi pi-box', color: '#607D8B' },
        { status: 'ThaiWarehouseArrival', label: 'ถึงโกดังฝั่งไทยแล้ว', icon: 'pi pi-truck', color: '#607D8B' },
        ...(order.shipping === 'selfPickup' ? [
            { status: 'LaosWarehouseArrival', label: 'ถึงจุดรับสินค้าที่โกดังลาวแล้ว ลูกค้าโปรดมารับสินค้า', icon: 'pi pi-warehouse', color: '#607D8B' },
            { status: 'Received', label: 'ลูกค้ารับสินค้าเรียบร้อยแล้ว', icon: 'pi pi-check', color: '#607D8B' }
        ] : [
            { status: 'LaosWarehouseArrival', label: 'ถึงจุดรับสินค้าที่โกดังลาวแล้ว', icon: 'pi pi-warehouse', color: '#607D8B' },
            { status: 'InTransit', label: 'ขนส่งรับสินค้าที่โกดังแล้ว', icon: 'pi pi-truck', color: '#607D8B' },
            { status: 'BranchArrival', label: 'ถึงจุดรับสินค้าที่สาขาขนส่งแล้ว ลูกค้าโปรดมารับสินค้า', icon: 'pi pi-warehouse', color: '#607D8B' },
            { status: 'Received', label: 'ลูกค้ารับสินค้าเรียบร้อยแล้ว', icon: 'pi pi-check', color: '#00bf26' }
        ])
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
            <div className='w-full pt-3 flex flex-column gap-2 justify-content-center'>
                <Toast ref={toast}></Toast>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='border-1 surface-border border-round p-3'>
                        <h2 className="m-0 mb-2 p-0">Thank you for your order!</h2>
                        <p>หมายเลขคำสั่งซื้อ {order.id}</p>
                        <p>Your order has been placed and we will start preparing soon...</p>
                        <div>
                            <p>วันที่สั่งซื้อ {order.date} น.</p>
                            {/* <p>จัดส่งวัน {order.shippingTime}</p> */}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full border-right-1 pl-5">
                            <p>สถานะคำสั่งซื้อ</p>
                            <Timeline value={events} align="rigth" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                        </div>
                        <div className="w-full pl-5">
                            <div>
                                <h3>ข้อมูลการรับสินค้า</h3>
                                {order.shipping === 'courierDelivery' ? (
                                    <p>จัดส่งโดยขนส่ง {order.selectedDelivery.name} ไปยังสาขา {order.deliveryBranch}</p>
                                ) : (
                                    <p>รับสินค้าเองที่โกดังลาว (พิกัด)</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button className="w-fit align-self-center" label="ยกเลิกคำสั่งซื้อ" rounded />
                </div>

                {order.PaymentChannel === 'bankCounter'
                    ? (
                        <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                            <h2 className='text-center'>แจ้งการชำระเงิน</h2>
                            <div className="flex flex-column gap-3 justify-content-center align-self-center">
                                <div className="flex flex-column">
                                    <label htmlFor="currency-la">ระบุจำนวนเงิน(กีบ)</label>
                                    <InputNumber inputId="currency-la" value={amount} onValueChange={(e) => setAmount(e.value)} mode="currency" currency="LAK" locale="lo-LA" />
                                </div>
                                <div className="flex flex-column">
                                    <label htmlFor="username">วันที่โอนเงิน</label>
                                    <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
                                </div>
                                <div className="flex flex-column">
                                    <label htmlFor="username">เวลาที่โอนเงิน</label>
                                    <Calendar value={time} onChange={(e) => setTime(e.value)} timeOnly />
                                </div>

                                <FileUpload className="w-fit align-self-center" mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="แนบสลิปโอนเงิน" />
                                <Button className="w-fit align-self-center" label="ยืนยันชำระเงิน" rounded />
                            </div>
                        </div>)
                    : ("")
                }

                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='border-1 surface-border border-round p-2 flex justify-content-between'>
                        <div>
                            <p className="m-0 p-0 font-semibold">ผู้ขาย: CP Axtra Public Company Limited. Branch ()</p>
                            <p className="m-0 p-0">{order.items.length} รายการ</p>
                        </div>
                        <Button label="เพิ่มสินค้าทั้งหมดลงตะกร้า" outlined rounded />
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
                                <p className='m-2'>ค่า COD 3%</p>
                                <p className='m-2'>{CODCost.toFixed(2)} ฿</p>
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