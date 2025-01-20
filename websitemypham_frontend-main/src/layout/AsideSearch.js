import React, { useState } from "react";
import "./Search.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const AsideSearch = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  // Handle pressing "Enter" to navigate to search page
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <aside
      className="aside-search-box-wrapper offcanvas offcanvas-top"
      tabIndex="-1"
      id="AsideOffcanvasSearch"
      aria-labelledby="offcanvasTopLabel"
    >
      <div className="offcanvas-header">
        <h5 className="d-none" id="offcanvasTopLabel">
          Aside Search
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="offcanvas-body">
        <div className="container pt--0 pb--0">
          <div className="search-box-form-wrap">
            <div className="search-note">
              <p></p>
            </div>

            <div className="aside-search-form position-relative">
              <label htmlFor="SearchInput" className="visually-hidden">
                Search
              </label>
              <input
                id="SearchInput"
                type="search"
                className="form-control"
                placeholder="Tìm tên sản phẩm bạn muốn"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <button className="search-button" onClick={handleSubmit}>
                <i className="fa fa-search"></i>
              </button>

              {searchQuery && filteredProducts.length > 0 && (
                <ul className="search-results-list">
                  {filteredProducts.map((product) => (
                    <li key={product.id} className="search-result-item">
                      <img
                        src={product.imagemain}
                        alt={product.name}
                        className="search-result-image"
                      />
                      <div className="search-result-details">
                        <span className="search-result-name">
                        <a href={`/product/${product.productId}`}>{product.name}</a>

                        
                        </span>
                        {/* <h4 className="title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h4> */}
                        <span className="search-result-price">
                          {product.price} VND
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Show "no results" message */}
              {searchQuery && filteredProducts.length === 0 && (
                <p className="no-results">
                  No results found for "{searchQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideSearch;
