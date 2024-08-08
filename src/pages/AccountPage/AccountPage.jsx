import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../router/CartContext';
import { Button } from "primereact/button";

function AccountPage() {
    const { cart, orders } = useCart();
    useEffect(() => {
        console.log('Saving cart to localStorage:', orders);
    }, []);


    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    return (
        <>
            <div className="flex">
                <div className="checkout-2">
                    <ul>
                        <li>บัญชีของฉัน</li>
                        <li>ประวัติการสั่งซื้อ</li>
                        <li>รายการโปรด</li>
                        <li>จัดการข้อมูลส่วนบุคคล</li>
                        <li>ติดต่อเรา</li>
                    </ul>
                </div>
                {/* <div className=' mt-5 flex justify-content-center'> */}
                    <div className='checkout-1 w-full flex flex-column border-1 surface-border border-round-mb  py-3 px-3 bg-white justify-content-center'>
                        <h2 className="m-0 mb-2 p-0">ประวัติการสั่งซื้อ</h2>
                        <div className="">
                            <ul className='flex justify-content-between m-0 p-0'>
                                <li className='list-none'>ทั้งหมด</li>
                                <li className='list-none'>ต้องชำระเงิน</li>
                                <li className='list-none'>กำลังจัดเตรียม</li>
                                <li className='list-none'>กำลังจัดส่ง</li>
                                <li className='list-none'>จัดส่งสำเร็จ</li>
                                <li className='list-none'>ถูกยกเลิก</li>
                            </ul>
                        </div>
                        {orders.map((order, index) => (
                            <div className='border-1 surface-border border-round p-2 mt-2 flex justify-content-between align-items-center'>
                                <div>
                                    <p className="m-0 p-0">#รหัสใบเสร็จ {order.id}</p>
                                    <p className="m-0 p-0">Makro PRO</p>
                                </div>
                                <div>
                                    {order.items.map((product, index) => (
                                        <div key={index} className="cart-items p-0 m-0 mb-2 ">
                                            <div className="flex p-0 m-0">
                                                <img
                                                    src={product.product_image}
                                                    alt={product.product_name}
                                                    className="w-2 p-0 m-0 m-2"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="m-0 p-0">{order.status}</p>
                                    <p className="m-0 p-0">{order.date}</p>
                                </div>
                                <div>
                                    <p className="m-0 p-0">{order.total} ฿</p>
                                </div>
                                <div>
                                    <Link to={`/StatusShippingPage/${order.id}`}>
                                        <button className="p-button p-component">View</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                {/* </div> */}
            </div>
        </>

    )
}


export default AccountPage