import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { Link, useLocation, useNavigate } from "react-router-dom";


function QRPage() {
    const { cart, placeOrder,  cartDetails} = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [paymentCode, setPaymentCode] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('PENDING');

    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;



    useEffect(() => {
        // Assuming the API returns a JSON with a QR code URL and payment code
        async function fetchQrCode() {
            try {
                const response = await fetch('API_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: totalPayable,
                        currency: 'THB',
                        // other payment details
                    }),
                });
                const data = await response.json();
                setQrCodeUrl(data.qrCodeUrl);
                setPaymentCode(data.paymentCode);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        }

        fetchQrCode();
    }, [totalPayable]);

    // Polling payment status
    useEffect(() => {
        let pollingInterval;
        if (paymentCode) {
            pollingInterval = setInterval(async () => {
                try {
                    const response = await fetch(`PAYMENT_STATUS_ENDPOINT/${paymentCode}`);
                    const data = await response.json();
                    setPaymentStatus(data.status);

                    if (data.status === 'SUCCESS') {
                        handlePaymentSuccess();
                    }
                } catch (error) {
                    console.error('Error checking payment status:', error);
                }
            }, 5000); // Poll every 5 seconds
        }

        return () => clearInterval(pollingInterval); // Clean up on unmount
    }, [paymentCode]);

    const handlePaymentSuccess = () => {
        placeOrder(cartDetails);
        navigate("/PaymentSuccessfully");
    };

    return (
        <>
            <div className='w-full px-8 pt-5 flex justify-content-center'>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                    <h1 className="m-0 p-0">Makro</h1>
                    <p className="m-0 p-0">CP AXTRA PUBLIC COMPANY LIMITED</p>
                    <div className="flex justify-content-center">
                        <img
                            src={qrCodeUrl}
                            alt="QR Payment"
                            className="w-2 p-8 m-0 m-2 border-1"
                        />
                    </div>
                    <div className="flex">
                        <div className="w-full border-right-1 surface-border flex flex-column text-center">
                            <p className="m-0">Payment Code (Ref.1)</p>
                            <p className="mt-2">{paymentCode}</p>
                        </div>
                        <div className="w-full flex flex-column text-center">
                            <p className="m-0">Amount (THB)</p>
                            <p className="my-3 text-2xl font-bold">{totalPayable.toFixed(2)}</p>
                            <p className="m-0">*Please pay before</p>
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