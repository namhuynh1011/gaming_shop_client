import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Lấy userId khi app mount hoặc khi user thay đổi
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUserId(user.id || user.userId || user.email); // tuỳ cấu trúc user
    } else {
      setCurrentUserId(null);
    }
  }, []);

  // Load cart từ localStorage theo userId mỗi khi userId thay đổi
  useEffect(() => {
    if (currentUserId) {
      const cartData = localStorage.getItem(`cart_${currentUserId}`);
      setCart(cartData ? JSON.parse(cartData) : []);
    } else {
      setCart([]);
    }
  }, [currentUserId]);

  // Mỗi khi cart thay đổi, lưu lại vào localStorage theo userId
  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(`cart_${currentUserId}`, JSON.stringify(cart));
    }
  }, [cart, currentUserId]);

  // Các hàm thao tác với giỏ hàng
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        const newCart = [...prev];
        newCart[idx].qty += 1;
        return newCart;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}