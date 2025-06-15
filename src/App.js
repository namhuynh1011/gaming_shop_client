import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import {Login, Register, Home, Account} from "./pages/components";
import { ProductManager, ProductAddPage } from "./pages/admin";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />        {/* Trang chủ khi load */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin/products" element={<ProductManager />} />
        <Route path="/admin/products/add" element={<ProductAddPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;