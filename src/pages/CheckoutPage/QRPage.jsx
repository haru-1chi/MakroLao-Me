import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { useNavigate } from "react-router-dom";
import { convertTHBtoLAK } from '../../utils/DateTimeFormat';

const EXPIRE_TIME = 60;
const paymentUUID = "BCELBANK";

function QRPage() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { cart, cartDetails, user, clearCart, clearCartDetails } = useCart();
    const navigate = useNavigate();

    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [paymentCode, setPaymentCode] = useState('');
    const [expireTime, setExpireTime] = useState(EXPIRE_TIME);
    const [remainingTime, setRemainingTime] = useState(EXPIRE_TIME);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const totalPayable = cartDetails.amountPayment;

    // useEffect(() => {
    //     let pollingInterval;
    //     let expirationTimeout;

    //     async function fetchQrCode() {
    //         try {
    //             setLoading(true);
    //             const response = await axios.post(`${apiUrl}/payment/qrcode`, {
    //                 amount: totalPayable,
    //                 description: 'user123',
    //             });
    //             const result = response.data;
    //             setQrCodeUrl(result.qrCodeUrl);
    //             setPaymentCode(result.data.transactionid);

    //             const newExpireTime = result.data.expiretime || EXPIRE_TIME;
    //             setExpireTime(newExpireTime);
    //             setRemainingTime(newExpireTime);

    //             startPolling();

    //             expirationTimeout = setTimeout(() => {
    //                 fetchQrCode();
    //             }, expireTime * 1000);

    //         } catch (error) {
    //             console.error('Error generating QR code:', error);
    //             setError('Failed to generate QR code. Please try again.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     function startPolling() {
    //         if (pollingInterval) clearInterval(pollingInterval);

    //         pollingInterval = setInterval(async () => {
    //             try {
    //                 const response = await axios.post(`${apiUrl}/payment/subscription`, {
    //                     uuid: PAYMENT_UUID,
    //                     tid: "001",
    //                     shopcode: "12345678"
    //                 });

    //                 const data = response.data;
    //                 if (response.status === 200 && data.message === 'SUCCESS') {
    //                     setPaymentStatus(data.message);
    //                     handleCreateOrder();
    //                     clearInterval(pollingInterval);
    //                     clearTimeout(expirationTimeout);
    //                 } else {
    //                     console.log(data.message);
    //                 }
    //             } catch (error) {
    //                 console.error('Error checking payment status:', error);
    //             }
    //         }, 5000);
    //     }

    //     fetchQrCode();

    //     return () => {
    //         clearInterval(pollingInterval);
    //         clearTimeout(expirationTimeout);
    //     };
    // }, [totalPayable, apiUrl]);

    // useEffect(() => {
    //     if (remainingTime > 0) {
    //         const timerId = setInterval(() => {
    //             setRemainingTime(prevTime => prevTime - 1);
    //         }, 1000);

    //         return () => clearInterval(timerId);
    //     }
    // }, [remainingTime]);

    const handleCreateOrder = async () => {
        setLoading(true);
        try {
            // const totalBeforeDiscount = convertTHBtoLAK(cart.reduce((total, product) => total + product.product_price * product.quantity, 0));
            // const CODCost = Math.max(totalBeforeDiscount * 0.03, 30);
            // const totalPayable = totalBeforeDiscount + CODCost;

            const newOrder = {
                _items: cart,
                ...cartDetails,
                status: 1
                // status: cartDetails.paymentChannel === "bankCounter" ? "PendingPayment" : "pending",
                // totalBeforeDiscount,
                // CODCost,
                // totalPayable,

            };

            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated. Please log in.");
                return;
            }
            console.log(newOrder)
            const response = await axios.post(`${apiUrl}/orders`,
                newOrder,
                {
                    headers: { "token": token }
                })
            if (response.data && response.data.status) {
                console.log("Order successful", response.data);
                clearCart();
                clearCartDetails();
                navigate("/PaymentSuccessfully");
            } else {
                setError(response.data.message || "Order failed");
            }
        } catch (error) {
            console.error("Order error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderPaymentDetails = () => (
        <>
            <div className="flex justify-content-center">
                {qrCodeUrl && (
                    <div>
                        <p className="m-0 p-0 text-center">Qr Code</p>
                        <img
                            src={qrCodeUrl}
                            alt="QR Code for payment"
                            width={150}
                            height={150}
                        />
                    </div>
                )}
            </div>
            <div className="flex">
                <div className="block flex-grow-1 flex flex-column text-center">
                    <p className="m-0">Amount (LAK)</p>
                    {totalPayable && (
                        <p className="my-3 text-2xl font-bold">
                            {Number(totalPayable.toFixed(2)).toLocaleString('en-US')}
                        </p>
                    )}
                    <p className="m-0">เลขที่รายการ {paymentCode}</p>
                    {qrCodeUrl && (
                        <div className="p-0 my-2 surface-200 border-round flex justify-content-center align-content-center">
                            <p className="my-3">ชำระเงินภายใน {remainingTime} seconds</p>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-center">*กรุณาเปิดหน้านี้ไว้ จนกว่าชำระเงินนี้สำเร็จ</p>
        </>
    )

    const renderBankDetails = () => (
        <>
            <div className="flex mt-3">
                <div className="w-full flex flex-column justify-content-center gap-2 border-right-1 surface-border overflow-hidden text-overflow-ellipsis">
                    <p className="m-0 text-center">ธนาคาร: ไทยพานิชย์</p>
                    <p className="m-0 text-center">ชื่อบัญชี: บริษัท</p>
                    <p className="m-0 text-center">เลขบัญชี: 000-000000-0 (หรือรหัสอ้างอิง)</p>
                </div>
                <div className="w-full block flex-grow-1 flex flex-column text-center">
                    <p className="m-0">Amount (LAK)</p>
                    {totalPayable && (
                        <p className="my-3 text-2xl font-bold">
                            {Number(totalPayable.toFixed(2)).toLocaleString('en-US')}
                        </p>
                    )}

                </div>
            </div>
            <div className="my-5">
                <p className="text-center m-0">กรุณาแจ้งการโอนเงินภายใน 2 วัน</p>
                <p className="text-center m-0">เพื่อยืนยันคำสั่งซื้อของคุณ</p>
            </div>
        </>
    )


    return (
        <>
            <div className='w-full sm:px-3 lg:px-8 pt-5 flex justify-content-center'>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb '>
                    <h1 className="m-0 p-0">Makro</h1>
                    <p>CP AXTRA PUBLIC COMPANY LIMITED</p>

                    {cartDetails.paymentChannel === 'QRCode' ? (
                        loading ? (
                            <p>Loading QR code...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            renderPaymentDetails()
                        )
                    ) : (
                        renderBankDetails()
                    )}

                    <div className="flex align-items-center justify-content-center">
                        {/* <Link to="/PaymentSuccessfully"> */}
                        <Button label="Return to Merchant" size="small" rounded onClick={handleCreateOrder} />
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default QRPage