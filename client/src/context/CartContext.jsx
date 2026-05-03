import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { api } = useAuth();

  // 1. AGREGAR O SUMAR 
  const addToCart = (product) => {
    const itemInCart = cart.find((item) => item._id === product._id);
    
    if (itemInCart) {
      if (itemInCart.quantity < product.stock) {
        setCart(cart.map((item) => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        alert(`Stock máximo alcanzado (${product.stock} unidades)`);
      }
    } else {
      if (product.stock > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  // 2. RESTAR CANTIDAD (Botón -)
  const decreaseQuantity = (productId) => {
    const itemInCart = cart.find((item) => item._id === productId);
    
    if (itemInCart.quantity > 1) {
      setCart(cart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      // Si llega a 1 y apretás menos, se elimina
      removeFromCart(productId);
    }
  };

  // 3. ELIMINAR COMPLETAMENTE (Tachito)
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  
  return (
    <CartContext.Provider value={{ 
      cart, addToCart, decreaseQuantity, removeFromCart, 
      cartCount, cartTotal, clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);