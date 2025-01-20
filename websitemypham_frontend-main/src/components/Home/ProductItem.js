import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

const truncateTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
};
const ProductItem = ({
  productId,
  imgSrc,
  title,
  price,
  oldPrice,
  reviews,
  totalRating,
}) => {
  return (
    <div className="item col-xs-4 col-lg-4">
      <Link to={`/shop/${productId}`} style={{ textDecoration: "none" }}>
        <div className="thumbnail">
          <img className="group list-group-image" src={imgSrc} alt={title} />
          <div className="caption">
            <h5 className="group inner list-group-item-heading">
              {truncateTitle(title, 30)}
            </h5>

            <div className="row">
              <div className="col-xs-12 col-md-6">
                <p className="lead d-flex align-items-center">
                  ${price} {/* Giá mới */}
                  {/* {oldPrice && (
                    <span style={{ textDecoration: "line-through", color: "red", marginLeft: "10px" }}>
                      ${oldPrice} 
                    </span>
                  )} */}
                </p>
              </div>

              <div className="col-xs-12 col-md-6">
                <div className="product-rating">
                  <div className="rating home-product">
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

                  <div className="reviews">{reviews} reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductItem;
