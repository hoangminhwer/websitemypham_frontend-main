import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./Scroll";
import AsideCartMenu from "./asideCartMenu";
import AsideMenu from "./asideMenu";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import AsideSearch from "./AsideSearch";

const Layout = ({ children }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const isHomePage = location.pathname === "/";
  const createBreadcrumb = (pathname) => {
    const paths = pathname.split("/").filter((x) => x);
    const breadcrumbArray = paths.map((path, index) => {
      // Kiểm tra nếu là trang /shop/category/:categoryId
      if (path === "category" && paths[index + 1]) {
        const categoryId = paths[index + 1];
        const categoryName = getCategoryNameById(categoryId); // Lấy tên danh mục
        return {
          label: categoryName || "Category",
          href: `/shop/category/${categoryId}`,
          active: true,
        };
      }

      const href = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href,
        active: index === paths.length - 1,
      };
    });

    return [{ label: "Home", href: "/", active: false }, ...breadcrumbArray];
  };

  const getCategoryNameById = (categoryId) => {
    if (!categories || categories.length === 0) {
      console.log("Danh sách danh mục chưa được tải.");
      return "Danh mục"; // Trả về chuỗi mặc định khi danh mục chưa được tải
    }

    const category = categories.find(
      (cat) => cat.categoryId === Number(categoryId) // Sửa theo cấu trúc dữ liệu của bạn
    );

    if (!category) {
      console.log("Không tìm thấy danh mục cho categoryId: ", categoryId);
      return "Danh mục"; // Trả về chuỗi mặc định nếu không tìm thấy
    }

    return category.name; // Trả về tên danh mục nếu tìm thấy
  };

  const breadcrumb = createBreadcrumb(location.pathname);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/load_available"
        );
        const data = await response.json();
        setProducts(data); // Save products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories"); // Giả sử API này trả về danh sách các danh mục
        const data = await response.json();
        setCategories(data); // Lưu danh sách danh mục vào state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {!isHomePage && (
         <PageHeader
         title={
          location.pathname.includes("/shop/category")
            ? getCategoryNameById(location.pathname.split("/").pop()) // Lấy tên danh mục dựa trên `categoryId`
            : breadcrumb[breadcrumb.length - 1].label
        }
         breadcrumb={breadcrumb}
       />
       
        )}
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <AsideCartMenu />
      <AsideMenu />
      <AsideSearch products={products} />
    </div>
  );
};

export default Layout;
