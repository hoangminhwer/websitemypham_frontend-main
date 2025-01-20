import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./Header.css";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    setIsLoggedIn(!!token); // Nếu có token, đặt trạng thái đăng nhập thành true
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("InfKH");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch data từ sessionStorage và đếm số sản phẩm trong giỏ hàng
  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const totalItems = cart.length; // Đếm số mã sản phẩm (số lượng sản phẩm khác nhau)
    setCartItemCount(totalItems);
  }, []); // Thực hiện khi component được render

  return (
    <header
      className={
        isHomePage
          ? "header-area sticky-header header-transparent"
          : "header-area sticky-header"
      }
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-5 col-lg-2 col-xl-1">
            <div className="header-logo">
              <a href="/">
                <img
                  className="logo-main"
                  src="/assets/images/logo.webp"
                  width="95"
                  height="68"
                  alt="Logo"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-7 col-xl-7 d-none d-lg-block">
            <div className="header-navigation ps-7">
              <ul className="main-nav justify-content-start">
                <li className="has-submenu">
                  <a href="/">Home</a>
                </li>
                <li className="has-submenu position-static">
                  <a href="/shop">Shop</a>
                  <ul className="submenu-nav-mega">
                    <li>
                      <ul>
                        {categories.map((category) => (
                          <li key={category.id}>
                            <a href={`/shop/category/${category.categoryId}`}>{category.name}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-7 col-lg-3 col-xl-4">
            <div className="header-action justify-content-end">
              <button
                className="header-action-btn ms-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#AsideOffcanvasSearch"
                aria-controls="AsideOffcanvasSearch"
              >
                <span className="icon">
                  <Icon.Search />
                </span>
              </button>
              <button
                className="header-action-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#AsideOffcanvasCart"
                // aria-controls="AsideOffcanvasCart"
              >
                <span className="icon">
                  <Icon.Cart />
                </span>
                {/* Hiển thị số sản phẩm trong giỏ hàng */}
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </button>
              {isLoggedIn ? (
                <div className="user-dropdown">
                  <a className="header-action-btn" href="/account">
                    <span className="icon">
                      <Icon.Person />
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="menu-account-item">
                      <a href="/account" className="menu-account-link">
                        Tài khoản
                      </a>
                    </li>
                    <li className="menu-account-item">
                      <button
                        onClick={handleLogout}
                        className="menu-logout-btn"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <a className=" btn-login btn-header" href="/login">
                    Login
                  </a>
                  <a className=" btn-register btn-header" href="/register">
                    Register
                  </a>
                </>
              )}
              <button
                className="header-menu-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#AsideOffcanvasMenu"
                // aria-controls="AsideOffcanvasMenu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
