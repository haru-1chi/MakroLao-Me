//ข้อมูล Body ที่ post to {{url_dev}}/orders
//*ฝั่ง frontend ตอนนี้
// _id || code
// user_id
// createdAt
//x shipping,
// selectedDelivery, //delivery_id delivery
//x deliveryBranch,
//x paymentChannel
// line_items
// status (processing)
// items_price
// cod_price
// net_price
// ++ เพิ่ม currency
// ++ เพิ่ม dropoff_id

//ฝั่ง Backend
//x "currency": "THB",
// "_id": "66bdd66efeceb4c324bc2d70",
// "code": "MLO-670815-0001",
// "user_id": "66bdbe6c6067f1bb5f595fc0",
// "status": "processing",
// "line_items": [],
// "items_price": 2590,
// "cod_percent": 3,
// "cod_price": 77.7,
// "net_price": 2667.7,
//x "dropoff_id": "66bdd3023208ada843eb3a1c", //รายละเอียดสาขาที่รับออเดอร์/ที่สั่ง
// "delivery_id": "66bdd415203788461da41f81", //ขนส่งที่เลือก (ไอเดีย)
// "createdAt": "2024-08-15T10:20:30.386Z",
// "updatedAt": "2024-08-15T10:25:03.446Z",
// "__v": 0,
// "delivery": "ไอเดีย"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { formatDate, getLocalStorageItem, setLocalStorageItem, convertTHBtoLAK } from '../utils/DateTimeFormat';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const COD_COST_RATE = 0.03;

  const [user, setUser] = useState({});

  const [cart, setCart] = useState([]);
  const [cartDetails, setCartDetails] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const storedUser = getLocalStorageItem('user', null);
      setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user && user._id) {
      const storedCart = getLocalStorageItem(`cart_${user._id}`, '[]');
      setCart(storedCart);
      const storedCartDetails = getLocalStorageItem(`cartDetails_${user._id}`, '{}');
      setCartDetails(storedCartDetails);
      const storedOrders = getLocalStorageItem(`orders_${user._id}`, '[]');
      setOrders(storedOrders);
    }
  }, [user]);

  useEffect(() => {
    if (user && user._id && cart.length) {
      setLocalStorageItem(`cart_${user._id}`, cart);
    }
  }, [cart, user]);

  useEffect(() => {
    if (user && user._id) {
      setLocalStorageItem(`cartDetails_${user._id}`, cartDetails);
    }
  }, [cartDetails, user]);

  useEffect(() => {
    if (user && user._id) {
      setLocalStorageItem(`orders_${user._id}`, orders);
    }
  }, [orders, user]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.product_id === product.product_id);
      return existingProduct
        ? prevCart.map(item => item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(product => product.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(product =>
      product.product_id === productId ? { ...product, quantity: Math.max(1, quantity) } : product
    ));
  };

  const placeCartDetail = (details) => {
    const newCartDetails = {
      id: `${Date.now()}`,
      ...details
    };
    setCartDetails(newCartDetails);
  };

  const placeOrder = (orderDetails) => {
    const totalBeforeDiscount = convertTHBtoLAK(cart.reduce((total, product) => total + product.product_price * product.quantity, 0));
    const CODCost = totalBeforeDiscount * COD_COST_RATE;
    const totalPayable = totalBeforeDiscount + CODCost;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      user,
      date: formatDate(new Date()),
      ...orderDetails,
      items: [...cart],
      status: { key: 'Ordered', value: 'ได้รับคำสั่งซื้อแล้ว' },
      totalBeforeDiscount,
      CODCost,
      totalPayable: totalPayable,
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    clearCartDetails();
  };

  const clearCart = () => setCart([]);
  const clearCartDetails = () => setCartDetails([]);
  const clearOrder = () => setOrders([]);

  const resetCart = () => {
    setCart([]);
    setCartDetails({});
    setOrders([]);
  };

  return (
    <CartContext.Provider value={{ user, cart, cartDetails, orders, addToCart, removeFromCart, updateQuantity, placeCartDetail, placeOrder, clearCart, clearCartDetails, clearOrder, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};