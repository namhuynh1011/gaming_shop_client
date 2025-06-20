import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Login, Register, Home, Account, CartPage, CheckoutPage } from "./pages/components";
import {
  ProductManager,
  ProductAddPage,
  ProductEditPage,
  CategoriesManager,
  CategoryAddPage,
  UserManager,
} from "./pages/admin";
import { CartProvider } from "./components/CartContext";
// import CartPage from "./pages/components/CartPage"
function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Trang chủ khi load */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/admin/products/add" element={<ProductAddPage />} />
          <Route
            path="/admin/products/edit/:id"
            element={<ProductEditPage />}
          />
          <Route path="/admin/categories" element={<CategoriesManager />} />
          <Route path="/admin/categories/add" element={<CategoryAddPage />} />
          <Route path="/admin/account" element={<UserManager />} />
          {/* Thêm các route khác nếu cần */}

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Route cho sản phẩm chi tiết */}
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
