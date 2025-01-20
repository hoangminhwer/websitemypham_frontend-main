import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import feather from "feather-icons"; // Import feather icons
import "./leftsidebar.css";

const LeftSidebar = () => {
  useEffect(() => {
    // Kích hoạt biểu tượng Feather mỗi khi render hoặc cập nhật
    feather.replace();
  });

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
           
            <li>
              <NavLink
              
                to="/admin/dashboard"   
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="home"></i>
              
                <span data-key="t-dashboard">Dashboard</span>
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/admin/product"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="shopping-cart"></i>
                <span data-key="t-ecommerce">Quản lý sản phẩm</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/order"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="shopping-cart"></i>
                <span data-key="t-ecommerce">Quản lý đơn hàng</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/account"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="user"></i>
                <span data-key="t-account">Quản lý tài khoản</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/transport"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="archive"></i>
                <span data-key="t-inventory">Quản lý vận đơn</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/transaction"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="archive"></i>
                <span data-key="t-transaction">Quản lý giao dịch</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/category"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="shopping-cart"></i>
                <span data-key="t-ecommerce">Quản lý danh mục</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/report"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="archive"></i>
                <span data-key="t-report">Báo cáo thống kê</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/backup"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i data-feather="archive"></i>
                <span data-key="t-report">Backup</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
