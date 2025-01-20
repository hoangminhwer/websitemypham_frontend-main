import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ toggleSidebar }) => {
  const handleLogout = () => {
    // Xóa token hoặc thông tin đăng nhập khỏi sessionStorage
    sessionStorage.removeItem("jwtToken");

    // Điều hướng về trang đăng nhập hoặc trang chủ
    window.location.href = "/login"; // Không sử dụng navigate
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="/admin" className="logo logo-dark">
              <span className="logo-sm">
                <img
                  src="/assets/admin/assets/images/logo-sm.svg"
                  alt="logo"
                  style={{ height: "30px" }}
                  className="img-top-admin"
                />
              </span>
              <span className="logo-lg">
                <img
                  src="/assets/admin/assets/images/logo-sm.svg"
                  alt="logo"
                  height="24"
                  className="img-top-admin"
                />{" "}
                <span className="logo-txt">COSMETIC</span>
              </span>
            </Link>

            <Link to="/admin" className="logo logo-light">
              <span className="logo-sm">
                <img
                  src="/assets/admin/assets/images/logo-sm.svg"
                  alt="logo"
                  height="30"
                  className="img-top-admin"
                />
              </span>
              <span className="logo-lg">
                <img
                  src="/assets/admin/assets/images/logo-sm.svg"
                  alt="logo"
                  height="24"
                  className="img-top-admin"
                />{" "}
                <span className="logo-txt">COSMETIC</span>
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 header-item"
            id="vertical-menu-btn"
            onClick={toggleSidebar} // Gọi hàm toggleSidebar khi click
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="dropdown d-inline-block">
          <button
            type="button"
            className="btn header-item bg-light-subtle border-start border-end"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="rounded-circle header-profile-user"
              src="/assets/admin/assets/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ms-1 fw-medium">
              Thanh Sơn
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </button>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/admin/profile">
              <i className="mdi mdi-face-profile font-size-16 align-middle me-1"></i>{" "}
              Profile
            </Link>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item" onClick={handleLogout}>
              <i className="mdi mdi-logout font-size-16 align-middle me-1"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
