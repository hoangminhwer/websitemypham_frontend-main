import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import BreadCrumb from "./Breakcrumb";
import Footer from "./Footer";
import Rightbar from "./RightSidebar";
import Overlay from "./Orverlay";
import Header from "./Header";
import "./adminlayout.css";
import "metismenu";
import "../assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css";
import "../assets/css/preloader.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/icons.min.css";
import "../assets/css/app.min.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();
  const [products, setProducts] = useState([]);
  const isHomePage = location.pathname === "/admin";
  // Tạo breadcrumb tự động từ đường dẫn
  const createBreadcrumb = (pathname) => {
    const paths = pathname.split("/").filter((x) => x); // Bỏ dấu "/" trống
    const breadcrumbArray = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href,
        active: index === paths.length - 1,
      };
    });

    return breadcrumbArray;
  };

  const breadcrumb = createBreadcrumb(location.pathname);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`admin-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      id="layout-wrapper"
    >
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarOpen && <LeftSidebar />}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <BreadCrumb /> */}

            {!isHomePage && (
              <BreadCrumb
                title={breadcrumb[breadcrumb.length - 1].label} // Tên trang hiện tại
                breadcrumb={breadcrumb}
              />
            )}

            {children}
          </div>
        </div>
      </div>
      <Overlay />
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
