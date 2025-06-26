import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Login,
  Register,
  Home,
  Account,
  CartPage,
  CheckoutPage,
  ProductsDetailPage,
  ProductPage,
  MyOrders,
} from "./pages/components";
import {
  ProductManager,
  ProductAddPage,
  ProductEditPage,
  CategoriesManager,
  CategoryAddPage,
  UserManager,
  BrandsManager,
  BrandAddPage,
  AdminOrdersPage,
} from "./pages/admin";
import { CartProvider } from "./components/CartContext";
import "./app.scss";
function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <Router>
          <Header className="header" />
          <div className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin/products" element={<ProductManager />} />
                <Route
                  path="/admin/products/add"
                  element={<ProductAddPage />}
                />
                <Route
                  path="/admin/products/edit/:id"
                  element={<ProductEditPage />}
                />
                <Route
                  path="/admin/categories"
                  element={<CategoriesManager />}
                />
                <Route
                  path="/admin/categories/add"
                  element={<CategoryAddPage />}
                />
                <Route
                  path="/admin/brands"
                  element={<BrandsManager />}
                />
                <Route
                  path="/admin/brands/add"
                  element={<BrandAddPage />}
                />
                <Route
                  path="/admin/order"
                  element={<AdminOrdersPage />}
                />
                <Route path="/admin/account" element={<UserManager />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/product/:id" element={<ProductsDetailPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/my-orders" element={<MyOrders />} />
              </Routes>
            </div>
          </div>
          <Footer className="footer" />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
