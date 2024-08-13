import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { Link, useNavigate } from "react-router-dom";

function QRPage() {
    const { cart, placeOrder, cartDetails } = useCart();
    const navigate = useNavigate();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [paymentCode, setPaymentCode] = useState('');
    const [expireTime, setExpireTime] = useState(60);
    const [remainingTime, setRemainingTime] = useState(60);

    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = cartDetails.amountPayment;

    useEffect(() => {
        async function fetchQrCode() {
            try {
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
                setPaymentCode(result.code);
                setExpireTime(result.data.expiretime);
                setRemainingTime(result.data.expiretime);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        }

        fetchQrCode();
    }, []);

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

    return (
        <>
            <div className='w-full px-8 pt-5 flex justify-content-center'>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb '>
                    <h1 className="m-0 p-0">Makro</h1>
                    <p className="m-0 p-0">CP AXTRA PUBLIC COMPANY LIMITED</p>
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
                        <div className="block w-12rem border-right-1 surface-border overflow-hidden text-overflow-ellipsis">
                            <p className="m-0 text-center">Payment Code (Ref.1)</p>
                            <p className="mt-2 text-center overflow-hidden text-overflow-ellipsis whitespace-normal">{paymentCode}</p>
                        </div> 
                        <div className="block flex-grow-1 flex flex-column text-center">
                            <p className="m-0">Amount (KIPS)</p>
                            <p className="my-3 text-2xl font-bold">{Number(totalPayable.toFixed(2)).toLocaleString('en-US')}</p>
                            {qrCodeUrl && (
                            <div className="flex flex-column align-content-center">
                                <p className="m-0">*Please pay before</p>
                                <p className="m-0">{remainingTime}</p>
                                <p className="m-0">seconds</p>
                            </div>
                            )}
                        </div>
                    </div>

                    <p className="text-center">Moblie No. (Ref.2) number</p>
                    <div className="flex align-items-center justify-content-center">
                        <Link to="/PaymentSuccessfully"><Button label="Return to Merchant" size="small" rounded onClick={handlePaymentSuccess} /></Link>
                    </div>
                    <div className="flex align-items-center justify-content-center">
                        <Link><Button label="View Instructions" size="small" rounded /></Link>
                    </div>
                </div>

            </div>
        </>

    )
}

export default QRPage