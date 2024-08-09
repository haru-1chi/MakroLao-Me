import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const formatDate = (date) => {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('th-TH', options).format(date);

  const [weekday, day, month, year, time] = formattedDate.split(' ');
  const [hour, minute] = time.split(':');

  return `${weekday} ${day} ${month} ${parseInt(year)} ${hour}.${minute}`;
};

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}.${minutes}`;
}

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const user = {
    id: 1,
    name: 'วันดี วันเพ็ญ',
    tel: '099 999 9999',
    address: '123 ต.ตำบล อ.เมือง จ.จังหวัด',
    zipcode: 12345,
  };

  const [cartDetails, setCartDetails] = useState(() => {
    const storedCartDetails = localStorage.getItem('cartDetails');
    return storedCartDetails ? JSON.parse(storedCartDetails) : [];
  });

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.product_id === product.product_id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
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

  const clearCart = () => {
    setCart([]);
  };
  const clearOrder = () => {
    setOrders([]);
  };

  const clearCartDetails = () => {
    setCartDetails([]);
  };
  
  const placeCartDetail = (details) => {
    const newCartDetails = {
      id: `${Date.now()}`,
      ...details
    };
    setCartDetails(newCartDetails);
    console.log(newCartDetails)
  };

  const placeOrder = (orderDetails) => {
    const calculateTotalBeforeDiscount = () => {
      return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
    };

    const calculateShippingCost = (total) => {
      return total * 0.03;
    };
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const shippingCost = calculateShippingCost(totalBeforeDiscount);
    const totalPayable = totalBeforeDiscount + shippingCost;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      user: user,
      date: `${formatDate(new Date())}`,
      ...orderDetails, //detail อื่นๆที่ถูกใส่เข้ามา เช่น เลขภาษี
      items: [...cart],
      status: {
        key: 'Ordered',
        value: 'ได้รับคำสั่งซื้อแล้ว'
      },
      total: totalPayable.toFixed(2)
    };
    console.log(newOrder)
    setOrders([...orders, newOrder]);
    setCart([]);
    setCartDetails([]);
  };

  return (
    <CartContext.Provider value={{ user, cart, orders, cartDetails, addToCart, removeFromCart, updateQuantity, clearCart, clearCartDetails, placeCartDetail, placeOrder, clearOrder }}>
      {children}
    </CartContext.Provider>
  );
};
