import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";
import { Timeline } from 'primereact/timeline';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import axios from "axios";
import { formatDate, convertTHBtoLAK, formatLaosPhone } from '../../utils/DateTimeFormat';

function StatusShippingPage({ orderId }) {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const { statusEvents } = useCart();
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [amount, setAmount] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const user_id = localStorage.getItem("user_id");
                const res = await axios.get(`${apiUrl}/users/${user_id}`, {
                    headers: {
                        "token": token,
                    },
                });
                setUser(res.data.data);
            } catch (err) {
                console.error("Error fetching user data", err.response?.data || err.message);
            }
        };
        getUserProfile();
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${apiUrl}/orders/${orderId}`, {
                    headers: { "token": token }
                });
                
                if (response.data.status && response.data.data) {
                    
                    setOrder(response.data.data);
                } else {
                    console.error("Order failed:", error.response?.data || error.message);
                }
            } catch (error) {
                console.error("Order error:", error.response?.data || error.message || error.response?.data?.message);
            }
        };

        fetchOrder();
    }, [apiUrl, orderId]);

    useEffect(() => {
        if (order) {
            setCurrentStatus(statusEvents[order.status]);
        }
    }, [order, statusEvents]);
    
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const events = [
        statusEvents.Ordered,
        ...(order?.paymentChannel === 'bankCounter' ? [statusEvents.PendingPayment] : []),
        statusEvents.pending,
        statusEvents.Preparing,
        statusEvents.Packaged,
        statusEvents.ThaiWarehouseArrival,
        ...(order?.shipping === 'selfPickup'
            ? [statusEvents.LaosWarehouseArrival, statusEvents.Received]
            : [statusEvents.LaosWarehouseArrival, statusEvents.InTransit, statusEvents.BranchArrival, statusEvents.Received]
        )
    ];

    const statusesOrder = events.map(event => event.key);

    const isStatusOrBefore = (status) => {
        const currentIndex = statusesOrder.indexOf(currentStatus?.key);
        const statusIndex = statusesOrder.indexOf(status);

        if (currentStatus?.key === 'Ordered' || currentStatus?.key === 'PendingPayment' || currentStatus?.key === 'pending') {
            const previousStatusIndex = statusIndex > 0 ? statusIndex + 1 : 0;
            return previousStatusIndex <= currentIndex;
        } else {
            return statusIndex <= currentIndex;
        }
    };

    const customizedMarker = (item) => {
        const isCompleted = isStatusOrBefore(item?.key);
        return (
            <div className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle shadow-1"
                style={{ backgroundColor: isCompleted ? '#00bf26' : '#607D8B' }}>
                <i className={isCompleted ? 'pi pi-check' : item.icon}></i>
            </div>
        );
    };

    const customizedContent = (item) => {
        return (
            <p className='font-semibold'>{item.value}</p>
            // timeStamp from updatedAT
        );
    };

    return (
        <>
            <div className='w-full pt-3 flex flex-column gap-2 justify-content-center'>
                <Toast ref={toast}></Toast>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='border-1 surface-border border-round p-4'>
                        <h2 className="m-0 mb-0 p-0 font-semibold">Thank you for your order!</h2>
                        <p className='mt-0 font-semibold'>หมายเลขคำสั่งซื้อ {order?.code}</p>
                        <p>ได้รับคำสั่งซื้อของคุณแล้ว และเราจะเริ่มตรวจสอบเร็วๆ นี้...</p>
                        <p className='mb-0 text-sm'>วันที่สั่งซื้อ {formatDate(order?.createdAt)} น.</p>
                    </div>
                    <div className="md:flex xl:flex lg:flex">
                        <div className="w-full border-right-1 surface-border pl-3 mt-3">
                            <p className='mt-0 font-semibold'>สถานะคำสั่งซื้อ</p>
                            <Timeline value={events} align="rigth" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                        </div>
                        <div className="w-full flex flex-column pl-5">
                            <div className='mt-4 md:mt-7 border-top-1 md:border-none surface-border'>
                                <h3 className='mb-2 font-semibold'>ที่อยู่ Makro สาขาหนองคาย</h3>
                                <p className='m-0 p-0'>232 ม.12 พอใจ</p>
                                <p className='m-0 p-0'>เมืองหนองคาย หนองคาย 43000</p>
                            </div>

                            <div className='mt-3 md:mt-5'>
                                <h3 className='mb-2 font-semibold'>ข้อมูลการรับสินค้า</h3>
                                {user ? (
                                    <>
                                        <p className='my-1 p-0'>ชื่อ {user.name}</p>
                                        <p className='my-1 p-0'>เบอร์โทร {formatLaosPhone(user.phone)}</p>
                                    </>
                                ) : ("")

                                }
                                {order?.shipping === 'courierDelivery' ? (
                                    <p className='my-2 p-0 font-semibold'>จัดส่งโดยขนส่ง {order?.delivery} ไปยังสาขา {order?.deliveryBranch}</p>
                                ) : (
                                    <p className='my-2 p-0 font-semibold'>รับสินค้าเองที่โกดังลาว</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {(order?.paymentChannel === 'bankCounter' && currentStatus?.key === 'PendingPayment') || (order?.paymentChannel === 'QRCode') ? ("") : (<Button className="mt-3 w-fit align-self-center" label="ยกเลิกคำสั่งซื้อ" rounded />)}
                </div>

                {order?.paymentChannel === 'bankCounter'
                    ? (
                        <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                            <h2 className='p-0 m-0 mb-2 text-center'>แจ้งการชำระเงิน</h2>
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

                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-2 px-2 bg-white border-round-mb justify-content-center'>
                    <div className='p-2 lg:flex justify-content-between'>
                        <div>
                            <p className="m-0 p-0 text-xl font-semibold">ผู้ขาย: CP Axtra Public Company Limited. Branch สาขาหนองคาย</p>
                            <p className="m-0 p-0">{order?.line_items?.length} รายการ</p>
                        </div>
                        <Button label="เพิ่มสินค้าทั้งหมดลงตะกร้า" outlined rounded className='w-full lg:w-fit'/>
                    </div>
                    <div className='surface-200'>
                        <p className='p-0 my-2 mx-3 font-semibold'>{currentStatus?.value}</p>
                    </div>
                    <div className="flex flex-column mx-5">
                        {order?.line_items?.map((product, index) => (
                            <div key={index} className="cart-items flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="w-full flex align-items-center">
                                    <img
                                        src={product.product_image}
                                        alt={product.product_name}
                                        width={60}
                                        height={60}
                                    />
                                    <div className="flex flex-column ml-4">
                                        <span className="mb-1 font-semibold">{product.product_name}</span>
                                        <span>{product.quantity} หน่วย</span>
                                    </div>
                                </div>
                                <div className='w-4 text-right'>
                                    <span className='text-xl font-medium'>{product.ppu * product.quantity} ฿</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                    <div className='xl:flex lg:flex'>
                        <div className='w-full mb-3'>
                            <h3 className="m-0 mb-2 p-0 font-semibold">ข้อมูลการชำระเงิน</h3>
                            {order?.paymentChannel === 'bankCounter' ?
                                <p className='m-0 p-0'>ช่องทางการชำระเงิน: ชำระเงินผ่านเคาท์เตอร์ธนาคาร</p>
                                :
                                <p className='m-0 p-0'>ช่องทางการชำระเงิน: ชำระเงินผ่าน OnePay</p>
                            }
                            <p className='m-0 p-0'>สถานะ: {currentStatus?.value}</p>
                            <p className='m-0 p-0'>วันที่: {formatDate(order?.updatedAt)} น.</p>
                        </div>
                        <div className='w-full flex flex-column bg-white border-round-mb justify-content-center pt-3 lg:pt-0 border-top-1 lg:border-none surface-border'>
                            <h3 className="m-0 mb-2 p-0 font-semibold">สรุปคำสั่งซื้อ</h3>
                            <div className="flex align-items-center justify-content-between py-2">
                                <p className='m-0 p-0'>ยอดรวม</p>
                                <p className='m-0 p-0 pr-2 font-semibold'>{order?.items_price?.toFixed(2)} ฿</p>
                            </div>
                            <div className="flex align-items-center justify-content-between py-2">
                                <p className='m-0 p-0'>ค่า COD 3%</p>
                                <p className='m-0 p-0 pr-2 font-semibold'>{order?.cod_price?.toFixed(2)} ฿</p>
                            </div>
                            <div className="flex align-items-center justify-content-between border-top-1 surface-border py-2">
                                <p className='m-0 p-0'>ราคารวม</p>
                                <p className='m-0 p-0 pr-2 font-semibold text-primary'>{order?.net_price?.toFixed(2)} ฿</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-round surface-100 flex justify-content-center align-items-center'>
                        <i className="pi pi-mobile mr-2 text-primary"></i>
                        <p className='text-center'>หากมีคำถามหรือข้อสงสัยเกี่ยวกับคำสั่งซื้อ ติดต่อฝ่ายบริการลูกค้าผ่านไลน์ @makropro หรือโทร 1432</p>
                    </div>
                </div>
            </div>
        </>

    )
}


export default StatusShippingPage