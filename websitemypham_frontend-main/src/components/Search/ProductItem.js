import React from "react";
import { Link } from "react-router-dom";

const ProductItemSearch = ({
  id,
  imgSrc,
  imgAlt,
  title,
  price,
  oldPrice,
  reviews,
}) => {
  return (
    <div className="product-item product-st3-item">
      <div className="product-thumb">
        <Link className="d-block" to={`/product/${id}`}>
          <img src={imgSrc} width="370" height="450" alt={imgAlt} />
        </Link>
        <span className="flag-new">new</span>
      </div>
      <div className="product-info">
        <div className="product-rating">
          <div className="rating">
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-half-o"></i>
          </div>
          <div className="reviews">{reviews} reviews</div>
        </div>
        <h4 className="title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h4>
        <div className="prices">
          <span className="price">${price}</span>
          <span className="price-old">${oldPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSearch;
