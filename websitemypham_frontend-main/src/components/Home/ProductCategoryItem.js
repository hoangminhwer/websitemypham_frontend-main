import React from 'react';

const ProductCategoryItem = ({ imgSrc, title, bgColor }) => {
  return (
    <div className="col-6 col-lg-4 col-lg-2 col-xl-2">
      <a href="#" className="product-category-item" style={{ backgroundColor: bgColor }}>
        <img
          className="icon"
          src={imgSrc}
          width="80"
          height="80"
          alt={title}
        />
        {/* <h3 className="title">{title}</h3> */}
      </a>
    </div>
  );
};

export default ProductCategoryItem;
