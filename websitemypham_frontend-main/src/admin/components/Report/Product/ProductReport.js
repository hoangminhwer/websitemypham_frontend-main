import React, { useEffect, useState } from "react";
import "../Tag.css";
import DataTableProduct from "./DataTableProduct";
import PaginationReportAdmin from "../PaginationReportAdmin";

const ProductReport = () => {
  const [activeTag, setActiveTag] = useState("productsByCategory");
  const [productByCategoryData, setProductByCategoryData] = useState([]);
  const [bestSellingProductsData, setBestSellingProductsData] = useState([]);
  const [priceAnalysisData, setPriceAnalysisData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Thêm phân trang cho price analysis
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5); // PageSize cố định cho tất cả các tab

  const token = sessionStorage.getItem("jwtToken");

  // Hàm fetch data theo danh mục sản phẩm
  const fetchCategoryProductCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/products/category-count",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setProductByCategoryData(
        data.map((item) => ({
          category: item.categoryName,
          products: item.products,
        }))
      );
      // setLoading(false);
    } catch (error) {
      setError(error.message);
      // setLoading(false);
    }
  };

  // Hàm fetch sản phẩm bán chạy
  const fetchBestSellingProducts = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/best-selling?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch best-selling products data");
      }

      const data = await response.json();
      setBestSellingProductsData(
        data.content.map((item) => ({
          product: item.name,
          image: item.imagemain,
          brand: item.brand,
          sold: item.soldQuantity,
          price: item.price,
          stock: item.stock,
        }))
      );
      setTotalPages(data.totalPages);
      // setLoading(false);
    } catch (error) {
      setError(error.message);
      // setLoading(false);
    }
  };

  // Hàm fetch thống kê giá sản phẩm
  const fetchPriceAnalysisData = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/statistics?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch price analysis data");
      }

      const data = await response.json();
      setPriceAnalysisData(
        data.content.map((item) => ({
          product: item.name,
          image: item.imagemain,
          price: item.price,
          cost: item.cost,
          profitPerUnit: item.profit,
        }))
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect để fetch data dựa trên tab hiện tại
  useEffect(() => {
    // setLoading(true);
    setError(null);

    if (activeTag === "productsByCategory") {
      fetchCategoryProductCount();
    } else if (activeTag === "bestSellingProducts") {
      fetchBestSellingProducts(currentPage, pageSize);
    } else if (activeTag === "priceAnalysis") {
      fetchPriceAnalysisData(currentPage, pageSize);
    }
  }, [activeTag, currentPage, pageSize, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
  };

  return (
    <div>
      <div className="tags">
        <span
          className={activeTag === "productsByCategory" ? "active-tag" : "tag"}
          onClick={() => setActiveTag("productsByCategory")}
        >
          Sản phẩm theo danh mục
        </span>
        <span
          className={activeTag === "bestSellingProducts" ? "active-tag" : "tag"}
          onClick={() => setActiveTag("bestSellingProducts")}
        >
          Sản phẩm bán chạy nhất
        </span>
        <span
          className={activeTag === "priceAnalysis" ? "active-tag" : "tag"}
          onClick={() => setActiveTag("priceAnalysis")}
        >
          Thống kê giá sản phẩm
        </span>
      </div>

      {/* {loading && <p>Loading...</p>} */}
      {error && <p>Error: {error}</p>}

      {activeTag === "productsByCategory" && (
        <div>
          <DataTableProduct data={productByCategoryData} />
        </div>
      )}

      {activeTag === "bestSellingProducts" && (
        <div>
          <DataTableProduct data={bestSellingProductsData} />
          <PaginationReportAdmin
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {activeTag === "priceAnalysis" && (
        <div>
          <DataTableProduct data={priceAnalysisData} />
          <PaginationReportAdmin
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductReport;
