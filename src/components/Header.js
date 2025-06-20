import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useCart } from "./CartContext";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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
            <Link to="/admin/products" className="header-btn">
              Quản lý sản phẩm
            </Link>
            <Link to="/admin/categories" className="header-btn">
              Quản lý loại Sản Phẩm
            </Link>
            <Link to="/admin/brands" className="header-btn">
              Quản lý hãng
            </Link>
            <Link to="/admin/account" className="header-btn">
              Quản lý Tài khoản
            </Link>
            {/* Có thể thêm nút khác sau này */}
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
