import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
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
      date: new Date().toISOString(),
      ...orderDetails,
      items: [...cart],
      status: 'pending',
      total: totalPayable
    };
    setOrders([...orders, newOrder]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateQuantity, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
