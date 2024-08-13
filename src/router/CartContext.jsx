import React, { createContext, useContext, useState, useEffect } from 'react';
import { formatDate, formatTime, convertTHBtoLAK } from '../utils/DateTimeFormat';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const COD_COST_RATE = 0.03;

  const user = {
    id: 1,
    name: 'วันดี วันเพ็ญ',
    tel: '099 999 9999',
    address: '123 ต.ตำบล อ.เมือง จ.จังหวัด',
    zipcode: 12345,
  };

  const [cartDetails, setCartDetails] = useState(() => JSON.parse(localStorage.getItem('cartDetails')) || []);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('orders')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
  }, [cartDetails]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

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
    
    const shippingCost = totalBeforeDiscount * COD_COST_RATE;

    const totalPayable = totalBeforeDiscount + shippingCost;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      user,
      date: formatDate(new Date()),
      ...orderDetails,
      items: [...cart],
      status: { key: 'Ordered', value: 'ได้รับคำสั่งซื้อแล้ว' },
      totalBeforeDiscount,
      shippingCost,
      total: totalPayable.toFixed(2),
      //รหัสสมาชิกลูกค้า
      //ที่อยู่
      //เลขประจำตัวผู้เสียภาษาและสาขาที่เสียภาษี
      //สถานที่ส่งสินค้า ซึ่งเป็นสาขาขนส่ง/โกดังที่จะไปรับ
      //เบอร์โทรติดต่อ
      //อีเมล
      //ชื่อลูกค้า ชื่อผู้รับสินค้า
      //สาขาที่ออกใบกำกับภาษา (สาขาแม็คโครไทย)
      //ที่อยู่แม็คโครไทย
      //เลขที่ น่าจะ ใบเสร็จ ไอดี
      //วันที่ และวันที่สั่งซื้อ
      //เลขที่สั่งซื้อ
      //วิธีการชำระเงิน
      //เลขที่ใบรับมัดจำ
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    setCartDetails([]);
  };

  const clearCart = () => {
    setCart([]);
  };
  const clearOrder = () => {
    setOrders([]);
  };

  const clearCartDetails = () => {
    setCartDetails([]);
  };
  
  return (
    <CartContext.Provider value={{ user, cart, orders, cartDetails, addToCart, removeFromCart, updateQuantity, clearCart, clearCartDetails, placeCartDetail, placeOrder, clearOrder }}>
      {children}
    </CartContext.Provider>
  );
};
