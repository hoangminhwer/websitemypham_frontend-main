import React from 'react';
import "./ProductReviewItem.css";



const ProductReviewItem = ({ imageSrc, name, designation, reviewText ,rating}) => {

  // Hàm để hiển thị ngôi sao dựa trên số rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Số lượng sao đầy (⭐)
    const halfStar = rating % 1 !== 0;    // Nếu có nửa sao (⭐½)
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số lượng sao trống (☆)

    const stars = [];

    // Thêm các sao đầy (⭐)
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }

    // Thêm nửa sao (⭐½) nếu có
    if (halfStar) {
      stars.push(<i key="half" className="fa fa-star-half"></i>);
    }

    // Thêm các sao trống (☆)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={fullStars + i + (halfStar ? 1 : 0)} className="fa fa-star-o"></i>);
    }

    return stars;
  };

  return (
    <div className="product-review-item">
      <div className="product-review-top">
        <div className="product-review-thumb">
          <img src={imageSrc} alt="Images" className='img-customer-review' />
        </div>
        <div className="product-review-content">
          <span className="product-review-name">{name}</span>
          <span className="product-review-designation">{designation}</span>
          <div className="product-review-icon">        
             {renderStars(rating)}
          </div>
        </div>
      </div>
      <p className="desc">{reviewText}</p>
      {/* <button type="button" className="review-reply"><i className="fa fa fa-undo"></i></button> */}
    </div>
  );
};

export default ProductReviewItem;
