import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCart } from '../../router/CartContext';
import { RadioButton } from 'primereact/radiobutton';
import { Outlet, Link } from "react-router-dom";

function QRPage() {
    const { cart, placeOrder } = useCart();

    const calculateTotalBeforeDiscount = () => {
        return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
        return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    const handlePaymentSuccess = () => {
        const orderDetails = {
            shippingAddress: "Your shipping address here", // replace with actual shipping address
            deliveryDate: "Your delivery date here", // replace with actual delivery date
            // Add any other order-related details here
        };
        placeOrder(orderDetails);
    };

    return (
        <>
            <div className='w-full px-8 pt-5 flex justify-content-center'>
                <div className='checkout-2 flex flex-column border-1 surface-border border-round py-5 px-3 bg-white border-round-mb justify-content-center'>
                    <h1 className="m-0 p-0">Makro</h1>
                    <p className="m-0 p-0">CP AXTRA PUBLIC COMPANY LIMITED</p>
                    <div className="flex justify-content-center">
                        <img
                            src=""
                            alt=""
                            className="w-2 p-8 m-0 m-2 border-1"
                        />
                    </div>
                    <div className="grid grid-columns-2 justify-content-center ">
                        <div className="border-right-1 surface-border flex flex-column text-center p-2">
                            <p className="m-0">Payment Code (Ref.1)</p>
                            <p className="mt-2">number</p>
                        </div>
                        <div className="flex flex-column text-center p-2">
                            <p className="m-0">Amount (THB)</p>
                            <p className="my-3 text-2xl font-bold">{totalPayable.toFixed(2)}</p>
                            <p className="m-0">*Please pay before</p>
                        </div>
                    </div>
                    <p className="text-center">Moblie No. (Ref.2) number</p>
                    <Link to="/PaymentSuccessfully"><Button label="Return to Merchant" size="small" rounded onClick={handlePaymentSuccess} /></Link>
                    
                    <Button label="View Instructions" size="small" rounded />
                </div>

            </div>
        </>

    )
}

export default QRPage