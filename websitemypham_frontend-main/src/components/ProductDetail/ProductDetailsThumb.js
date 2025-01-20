import React, { useState } from 'react';
import "./ProductDetailThumb.css";
const ProductDetailsThumb = ({ images, altText,imageList }) => {
  // Sử dụng state để lưu ảnh chính
  const [mainImage, setMainImage] = useState(images);

  // Hàm thay đổi ảnh chính khi click vào thumbnail
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="product-details-thumb">
      {/* Hình ảnh chính */}
      {/* <img src={mainImage} width="570" height="693" alt={altText} /> */}
      <div className="main-image">
        <img src={mainImage} alt={altText} />
      </div>
      {/* Hình ảnh nhỏ (thumbnail) */}
      <div className="thumbnail-images">
        {imageList.map((image, index) => (
          <img
            key={index}
            src={image}
            width="100"
            height="120"
            alt={`${altText} ${index}`}
            onClick={() => handleImageClick(image)} // Khi click, đổi ảnh chính
            className="thumbnail"
            style={{ cursor: 'pointer', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsThumb;
