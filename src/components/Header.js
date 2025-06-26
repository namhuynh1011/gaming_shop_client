import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useCart } from "./CartContext";
import { IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    }
    if (dropdownOpen || adminDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, adminDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleAccount = () => {
    setDropdownOpen(false);
    navigate("/account");
  };

  const isAdmin = user?.roles?.some(role => role.toLowerCase() === "admin");

  return (
    <header className="main-header">
      <div className="container">
        <div className="nav-left">
          <Link to="/" className="logo">
            Gaming Shop
          </Link>
          <nav className="nav-buttons">
            <Link to="/" className="header-btn">
              Trang chủ
            </Link>
            <Link to="/products" className="header-btn">
              Sản Phẩm
            </Link>
            <Link to="/my-orders" className="header-btn">
              Đơn Hàng Của Tôi
            </Link>
            {/* Dropdown quản lý cho admin */}
            {isAdmin && (
              <div className="header-dropdown" ref={adminDropdownRef} style={{display: "inline-block", position: "relative"}}>
                <button
                  className="header-user-btn"
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  type="button"
                >
                  Quản lý <span className="dropdown-arrow">▼</span>
                </button>
                {adminDropdownOpen && (
                  <div className="dropdown-menu" style={{minWidth: 180}}>
                    <Link to="/admin/products" className="dropdown-item" onClick={() => setAdminDropdownOpen(false)}>
                      Sản phẩm
                    </Link>
                    <Link to="/admin/categories" className="dropdown-item" onClick={() => setAdminDropdownOpen(false)}>
                      Loại Sản Phẩm
                    </Link>
                    <Link to="/admin/brands" className="dropdown-item" onClick={() => setAdminDropdownOpen(false)}>
                      Hãng
                    </Link>
                    <Link to="/admin/account" className="dropdown-item" onClick={() => setAdminDropdownOpen(false)}>
                      Tài khoản
                    </Link>
                    <Link to="/admin/order" className="dropdown-item" onClick={() => setAdminDropdownOpen(false)}>
                      Đơn Hàng
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <span className="user-greeting">Xin chào, {user.fullName}</span>
              <div className="header-dropdown" ref={dropdownRef}>
                <button
                  className="header-user-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  type="button"
                >
                  Tài khoản <span className="dropdown-arrow">▼</span>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleAccount}>
                      Quản lý tài khoản
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
              <Box>
                <IconButton color="inherit" component={Link} to="/cart">
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            </>
          ) : (
            <div className="guest-buttons">
              <Link to="/login" className="header-btn">
                Đăng nhập
              </Link>
              <Link to="/register" className="header-btn">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;