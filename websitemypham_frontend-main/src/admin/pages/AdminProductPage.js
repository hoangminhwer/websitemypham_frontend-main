import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios if you choose to use it
import SearchBarProduct from "../components/Product/SearchBarProduct";
import ProductTable from "../components/Product/ProductTable";
import PaginationProductAdmin from "../components/Product/PaginationProductAdmin";
import AddProductButton from "../components/Product/AddProductButton";

const AdminProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Ví dụ: 10 sản phẩm mỗi trang

  // Hàm fetch danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data); // Set categories data
      } catch (err) {
        setError(err);
      }
    };

    fetchCategories();
  }, []);

  // Hàm fetch sản phẩm với phân trang
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before making request
      try {
        const response = await axios.get(`http://localhost:8080/api/products`, {
          params: {
            page: currentPage - 1, // Spring Data Pageable là 0-indexed
            size: productsPerPage,
          },
        });

        setProducts(response.data.content); // .content chứa danh sách sản phẩm
        setTotalProducts(response.data.totalElements); // .totalElements chứa tổng số sản phẩm
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // Set loading to false after request is complete
      }
    };

    fetchData();
  }, [currentPage, productsPerPage]); 

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);

    return category ? category.name : "Unknown";
  };

   // Hàm thay đổi trang
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row mb-2">
              {/* <SearchBarProduct /> */}
              <AddProductButton />
            </div>
            <ProductTable
              products={products}
              getCategoryName={getCategoryName}
            />
            <PaginationProductAdmin
              productsPerPage={productsPerPage}
              totalProducts={totalProducts}
              paginate={paginate}
              currentPage={currentPage} // Truyền trang hiện tại để biết trang nào đang được chọn
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
