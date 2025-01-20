import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductItemShop from "../components/Shop/ProductItemShop";
import ProductItemSearch from "../components/Search/ProductItem";
import "./Searchpage.css"
const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Total pages from the API
  const [page, setPage] = useState(0); // Current page
  const [size, setSize] = useState(8); // Products per page
  const location = useLocation();

  // Extract query parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  // Fetch products whenever the search query or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/search?query=${searchQuery}&page=${page}&size=${size}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.content); // Paginated product data
          setTotalPages(data.totalPages); // Total number of pages from API response
        } else {
          console.error("Error fetching products:", response.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery, page, size]);

  // Handle "Previous" button click
  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1); // Move to previous page
    }
  };

  // Handle "Next" button click
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1); // Move to next page
    }
  };

  // Handle specific page number click
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber); // Move to clicked page number
  };

  return (
    <section className="section-space">
      <div className="container">
        <div className="row product-details">
          <h3>Từ khóa sản phẩm: {searchQuery}</h3>
          <div className="row">
            {/* Iterate over products and pass props to ProductItemShop */}
            {products.length > 0 ? (
              products.map((product) => (
                <div className="col-lg-3" key={product.productId}>
                  <ProductItemSearch
                    id={product.productId}
                    imgSrc={product.imagemain || "path/to/default.jpg"} // Fallback image if no imagemain
                    imgAlt={product.name}
                    title={product.name}
                    price={product.price}
                    oldPrice={product.cost || null}
                    reviews={product.reviews.length}
                  />
                </div>
              ))
            ) : (
              <p>No products found for "{searchQuery}"</p>
            )}
          </div>

          {/* Pagination controls */}
          <div className="pagination-controls">
            {/* Previous Button */}
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i)}
                className={i === page ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
