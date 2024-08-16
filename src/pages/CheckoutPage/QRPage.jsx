import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { Link, useNavigate } from "react-router-dom";

const EXPIRE_TIME = 60;

function QRPage() {
    const { cart, placeOrder, cartDetails } = useCart();
    const navigate = useNavigate();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [paymentCode, setPaymentCode] = useState('');
    const [expireTime, setExpireTime] = useState(EXPIRE_TIME);
    const [remainingTime, setRemainingTime] = useState(EXPIRE_TIME);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalPayable = cartDetails.amountPayment;

    useEffect(() => {
        async function fetchQrCode() {
            try {
                setLoading(true);
                const response = await fetch(`http://183.88.209.149:12233/makrolao/api/v1/payment/qrcode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: totalPayable,
                        description: 'user123',
                    }),
                });

                const result = await response.json();

                setQrCodeUrl(result.qrCodeUrl);
                setPaymentCode(result.data.transactionid);
                setExpireTime(result.data.expiretime || EXPIRE_TIME);
                setRemainingTime(result.data.expiretime || EXPIRE_TIME);
                setError(null);
            } catch (error) {
                console.error('Error generating QR code:', error);
                setError('Failed to generate QR code. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchQrCode();
    }, [totalPayable]);

    useEffect(() => {
        if (remainingTime > 0) {
            const timerId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [remainingTime]);

    // // Polling payment status
    // useEffect(() => {
    //     let pollingInterval;
    //     if (paymentCode) {
    //         pollingInterval = setInterval(async () => {
    //             try {
    //                 const response = await fetch(`PAYMENT_STATUS_ENDPOINT/${paymentCode}`);
    //                 const data = await response.json();
    //                 setPaymentStatus(data.status);

    //                 if (data.status === 'SUCCESS') {
    //                     handlePaymentSuccess();
    //                 }
    //             } catch (error) {
    //                 console.error('Error checking payment status:', error);
    //             }
    //         }, 5000); // Poll every 5 seconds
    //     }

    //     return () => clearInterval(pollingInterval); // Clean up on unmount
    // }, [paymentCode]);

    const handlePaymentSuccess = () => {
        placeOrder(cartDetails);
        navigate("/PaymentSuccessfully");
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
                    <p className="my-3 text-2xl font-bold">{Number(totalPayable.toFixed(2)).toLocaleString('en-US')}</p>
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
                    <p className="my-3 text-2xl font-bold">{Number(totalPayable.toFixed(2)).toLocaleString('en-US')}</p>
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
            <div className='w-full px-8 pt-5 flex justify-content-center'>
                <div className='bg-section-product flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb '>
                    <h1 className="m-0 p-0">Makro</h1>
                    <p>CP AXTRA PUBLIC COMPANY LIMITED</p>

                    {cartDetails.PaymentChannel === 'QRCode' ? (
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
                        <Link to="/PaymentSuccessfully">
                            <Button label="Return to Merchant" size="small" rounded onClick={handlePaymentSuccess} />
                        </Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default QRPage