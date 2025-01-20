import React, { useState, useEffect } from "react";
import ProductList from "../components/Shop/ProductList";
import Pagination from "../components/Shop/Pagination";
import ProductSidebar from "../components/Shop/ProductSidebar";
import {
  GET_PRODUCT_BY_CATEGORY_ID,
  GET_PRODUCT_COUNT,
  GET_PRODUCT_LIST,
  GET_PRODUCT_MIN_MAX_PRICE,
  GUEST_GET_CATEGORY,
} from "../service/api";
import { useParams } from "react-router-dom";

const ShopPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalSanPham, setTotalSanPham] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const pageSize = 6;

  // Hàm để lấy sản phẩm theo danh mục và phân trang
  const fetchProductsByCategory = (categoryId, page = 0) => {
    setSelectedCategory(categoryId); // Cập nhật danh mục đã chọn
    fetch(GET_PRODUCT_BY_CATEGORY_ID(categoryId, page, pageSize))
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.content); // Cập nhật sản phẩm
        setTotalPages(data.totalPages); // Cập nhật tổng số trang
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  };
    // Hàm để lấy toàn bộ sản phẩm
    const fetchAllProducts = (page = 0) => {
      fetch(GET_PRODUCT_LIST(page, pageSize))
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.content); 
          setFilteredProducts(data.content); 
          setTotalPages(data.totalPages); 
        })
        .catch((error) => {
          console.error("Error fetching all products:", error);
        });
    };



  
  // Fetch sản phẩm theo danh mục hoặc tất cả sản phẩm
  useEffect(() => {
    if (categoryId) {
      // Nếu có categoryId, lấy sản phẩm theo danh mục
      fetchProductsByCategory(categoryId, currentPage);
    } else {
      // Nếu không có categoryId, lấy tất cả sản phẩm
      fetchAllProducts(currentPage);
    }
  }, [categoryId, currentPage]);

  useEffect(() => {
    fetch(GUEST_GET_CATEGORY)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    fetch(GET_PRODUCT_COUNT)
      .then((response) => response.json())
      .then((data) => {
        setTotalSanPham(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedRange) {
      const minPrice = selectedRange.min;
      const maxPrice = selectedRange.max || 10000000; // Nếu max là null, đặt giá trị cao
      fetch(
        GET_PRODUCT_MIN_MAX_PRICE(minPrice, maxPrice, currentPage, pageSize)
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.content);
          setFilteredProducts(data.content);
          setTotalPages(data.totalPages);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [currentPage, selectedRange]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Hàm để chuyển trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory, newPage); // Gọi API khi chuyển trang
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleFilterChange = (range) => {
    setSelectedRange(range);
    setCurrentPage(0);
  };

  return (
    <section className="section-space">
      <div className="container">
        <div className="row justify-content-between flex-xl-row-reverse">
          <div className="col-xl-9">
            <ProductList products={filteredProducts} />
            <div className="col-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          <div className="col-xl-3">
            <ProductSidebar
              onSearch={handleSearch}
              onFilterChange={setSelectedRange}
              categories={categories}
              totalSanPham={totalSanPham}
              onSelectCategory={(categoryId) =>
                fetchProductsByCategory(categoryId)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
