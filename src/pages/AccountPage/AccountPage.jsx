import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";
import StatusShippingPage from './StatusShippingPage';
import axios from "axios";

function AccountPage() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [activeTab, setActiveTab] = useState('account');
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [user, setUser] = useState(null);
    const [userOrders, setUserOrder] = useState(null);
    const { orders, clearOrder } = useCart();
    const [activeOrderStatus, setActiveOrderStatus] = useState('all');

    const statusCounts = orders.reduce((counts, order) => {
        counts[order.status.key] = (counts[order.status.key] || 0) + 1;
        return counts;
    }, {});

    const filteredOrders = activeOrderStatus === 'all'
        ? orders
        : orders.filter(order => order.status.key === activeOrderStatus);


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
        const getUserOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${apiUrl}/orders`, {
                    headers: {
                        "token": token,
                    },
                });
                setUserOrders(res.data.data);
            } catch (err) {
                console.error("Error fetching user data", err.response?.data || err.message);
            }
        };
        getUserOrders();
    }, []);

    const handleRevertClick = () => {
        setSelectedOrderId(null);
    };

    const StatusBar = () => (
        <ul className='status-bar w-full flex justify-content-between font-semibold'>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'all' ? 'border-bottom-3 border-promary text-primary' : ''}`}
                onClick={() => setActiveOrderStatus('all')}>
                ทั้งหมด {orders.length}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'pending' ? 'border-bottom-3 border-promary text-primary' : ''}`}
                onClick={() => setActiveOrderStatus('pending')}>
                ต้องชำระเงิน {statusCounts['pending'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'Ordered' ? 'border-bottom-3 border-promary text-primary' : ''}`}
                onClick={() => setActiveOrderStatus('Ordered')}>
                กำลังจัดเตรียม {statusCounts['Ordered'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'shipping' ? 'border-bottom-3 border-promary text-primary' : ''}`}
                onClick={() => setActiveOrderStatus('shipping')}>
                กำลังจัดส่ง {statusCounts['shipping'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'Delivered' ? 'border-bottom-3 border-promary text-primary' : ''}`}
                onClick={() => setActiveOrderStatus('Delivered')}>
                จัดส่งสำเร็จ {statusCounts['Delivered'] || ''}
            </li>
            <li
                className={`list-none cursor-pointer ${activeOrderStatus === 'cancelled' ? 'border-bottom-3 border-promary text-primary' : ''}`}
                onClick={() => setActiveOrderStatus('cancelled')}>
                ถูกยกเลิก {statusCounts['cancelled'] || ''}
            </li>
        </ul>
    );


    const OrderHistory = () => (
        filteredOrders.length > 0 ? (
            selectedOrderId ? (
                <div>
                    <Button className='text-900' label="กลับไปดูประวัติการซื้อ" icon="pi pi-angle-left" onClick={handleRevertClick} text />
                    <StatusShippingPage orderId={selectedOrderId} />
                </div>
            ) : (
                <>
                    <h1 className="m-0 mb-2 p-0 font-semibold">ประวัติการสั่งซื้อ</h1>
                    <StatusBar />
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            onClick={() => setSelectedOrderId(order.id)}
                            className='no-underline text-900 cursor-pointer'
                        >
                            <OrderItem order={order} />
                        </div>
                    ))}
                </>
            )
        ) : (
            <>
                <h2 className="m-0 mb-2 p-0">ประวัติการสั่งซื้อ</h2>
                <StatusBar />
                <div className='h-full text-center align-content-center'>
                    <h2>ยังไม่มีรายการสั่งซื้อขณะนี้</h2>
                    <p className='mb-5'>คุณจะเห็นคำสั่งซื้อเมื่อมีคำสั่งซื้อที่ตรงตามเมนูสถานะที่คุณเลือก</p>
                    <Link to="/"><Button label="หาจากหมวดหมู่สินค้า" rounded /></Link>
                </div>
            </>
        )
    );

    const OrderItem = ({ order }) => (
        <div className='bg-section-product w-full grid bg-white border-1 surface-border border-round-xl py-3 px-2 mt-3 align-items-start'>
            <div className='col-2'>
                <p className="m-0 p-0">#{order.id}</p>
                <p className="m-0 p-0 font-semibold">Makro PRO</p>
            </div>
            <div className='col-5'>
                <div className="w-full flex flex-column text-left gap-2">
                    {order.items.map((product, index) => (
                        <div key={index} className="cart-items flex justify-content-between align-items-center pb-1 border-bottom-1 surface-border">
                            <div className="w-full flex align-items-center">
                                <img
                                    src={product.product_image}
                                    alt={product.product_name}
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-column ml-3">
                                    <span className="mb-1 font-semibold">{product.product_name}</span>
                                    <span>{product.quantity} หน่วย</span>
                                </div>
                            </div>
                            <div className='w-2 text-right'>
                                <span className='text-xl'>{product.product_price * product.quantity} ฿</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-3 justify-content-center'>
                <p className="m-0 p-0">{order.status.value}</p>
                <p className="mt-2 p-0"><i className='pi pi-shopping-cart mr-1'></i>{order.date}</p>
            </div>
            <div className='col-2'>
                <p className="m-0 p-0 text-right font-semibold text-primary text-l">{order.totalPayable?.toLocaleString('en-US')} ₭</p>
            </div>
        </div>
    );

    const MyAccount = () => (
        <div>
            <h1 className="m-0 mb-2 p-0 font-semibold">บัญชีของฉัน</h1>
            <div className='bg-section-product w-24rem flex flex-column border-1 surface-border border-round mt-4 py-3 px-3 bg-white border-round-mb justify-content-center align-self-center'>
                <h2 className="m-0 p-0 font-medium">ข้อมูลบัญชี</h2>
                <div className="card mt-3 flex flex-column gap-3 justify-content-center">
                    {user ? (
                        <div className='w-fit'>
                            <div className='grid align-items-center border-bottom-1 surface-border'>
                                <p className='col-4'>ชื่อ</p>
                                <p className='col'>{user.name}</p>
                            </div>
                            <div className='grid align-items-center border-bottom-1 surface-border'>
                                <p className='col-4'>อีเมล</p>
                                <p className='col'>{user.email}</p>
                            </div>
                            <div className='grid align-items-center border-bottom-1 surface-border'>
                                <p className='col-4'>เบอร์โทรศัพท์</p>
                                <p className='col'>{user.phone}</p>
                            </div>
                            <div className='grid align-items-center border-bottom-1 surface-border'>
                                <p className='col-4'>เลขประจำตัวผู้เสียภาษีอากร</p>
                                <p className='col text-sm'><i className='pi pi-minus text-sm'></i><br />คุณสามารถแก้ไขค่านี้ได้ขณะสั่งซื้อสินค้า</p>
                            </div>
                            <div className='grid align-items-center'>
                                <p className='col-4'>รหัสสาขา</p>
                                <p className='col text-sm'><i className='pi pi-minus text-sm'></i><br />คุณสามารถแก้ไขค่านี้ได้ขณะสั่งซื้อสินค้า</p>
                            </div>
                        </div>
                    ) : (
                        "loading..."
                    )}

                </div>
            </div>
        </div>
    )


    const Favorites = () => (
        <div>รายการโปรด</div>
    )

    const PrivacySettings = () => <div>จัดการข้อมูลส่วนบุคคล</div>;
    const ContactUs = () => <div>ติดต่อเรา</div>;

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'account':
                return <MyAccount />;
            case 'orderHistory':
                return <OrderHistory />;
            case 'favorites':
                return <Favorites />;
            case 'privacySettings':
                return <PrivacySettings />;
            case 'contactUs':
                return <ContactUs />;
            default:
                return <MyAccount />;
        }
    };


    return (
        <>
            <div className="flex my-5 mx-8">
                <div className="bg-section-product w-20rem h-fit bg-white border-1 surface-border border-round-xl mr-5">
                    <ul className='font-semibold'>
                        <li
                            className={`list-none py-3 cursor-pointer ${activeTab === 'account' ? 'text-primary' : ''}`}
                            onClick={() => setActiveTab('account')}
                        >
                            บัญชีของฉัน
                        </li>
                        <li
                            className={`list-none py-3 cursor-pointer ${activeTab === 'orderHistory' ? 'text-primary' : ''}`}
                            onClick={() => setActiveTab('orderHistory')}
                        >
                            ประวัติการสั่งซื้อ
                        </li>
                        <li
                            className={`list-none py-3 cursor-pointer ${activeTab === 'favorites' ? 'text-primary' : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            รายการโปรด
                        </li>
                        <li
                            className={`list-none py-3 cursor-pointer ${activeTab === 'privacySettings' ? 'text-primary' : ''}`}
                            onClick={() => setActiveTab('privacySettings')}
                        >
                            จัดการข้อมูลส่วนบุคคล
                        </li>
                        <li
                            className={`list-none py-3 cursor-pointer ${activeTab === 'contactUs' ? 'text-primary' : ''}`}
                            onClick={() => setActiveTab('contactUs')}
                        >
                            ติดต่อเรา
                        </li>
                    </ul>
                </div>
                <div className='w-full'>
                    {renderActiveComponent()}
                </div>
            </div>
        </>

    )
}


export default AccountPage