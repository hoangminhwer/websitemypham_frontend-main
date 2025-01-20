import React from "react";
import { Link } from "react-router-dom";
import "./shop.css";
const ProductItemShop = ({
  id,
  imgSrc,
  imgAlt,
  title,
  price,
  oldPrice,
  reviews,
  totalRating,
}) => {
  return (
    <div className="col-6 col-lg-4 col-xl-4 mb-4 mb-sm-8">
      <div className="thumbnail product-item product-st3-item">
        <div className="product-thumb">
          <Link className="d-block" to={`/shop/${id}`}>
            <img
              src={imgSrc}
              width="370"
              height="450"
              className="item-shop-product"
              alt={imgAlt}
            />
          </Link>
          <span className="flag-new">new</span>
        </div>
        <div className="caption product-info">
          <div className="product-rating">
            <div className="rating">
              {Array.from({ length: 5 }, (v, i) => {
                // Nếu reviews = 0, hiển thị toàn bộ sao rỗng
                if (reviews === 0) {
                  return <i key={i} className="fa fa-star-o"></i>;
                }
                // Ngược lại, hiển thị số sao dựa trên tổng rating
                if (totalRating >= i + 1) {
                  return <i key={i} className="fa fa-star"></i>;
                } else if (totalRating >= i + 0.5) {
                  return <i key={i} className="fa fa-star-half-o"></i>;
                } else {
                  return <i key={i} className="fa fa-star-o"></i>;
                }
              })}
            </div>
          </div>
          <h4 className="title list-group-item-heading">
            <Link to={`/shop/${id}`}>{title}</Link>
          </h4>
          <div className="prices">
            <span className="price">${price}</span>
            {/* <span className="price-old">${oldPrice}</span> */}
          </div>
          <div className="reviews">{reviews} reviews</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemShop;
