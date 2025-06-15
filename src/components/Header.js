import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
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
        <Link to="/" className="logo">Gaming Shop</Link>
        <Link to="/admin/products" style={{ marginLeft: 16 }}>
          Quản lý sản phẩm
        </Link>
        <nav>
          {user ? (
            <>
              <span className="user-greeting">Xin chào, {user.fullName}</span>
              <div className="header-dropdown" ref={dropdownRef}>
                <button
                  className="header-btn header-user-btn"
                  onClick={() => setDropdownOpen((open) => !open)}
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
            </>
          ) : (
            <>
              <Link to="/login" className="header-btn">Đăng nhập</Link>
              <Link to="/register" className="header-btn">Đăng ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;