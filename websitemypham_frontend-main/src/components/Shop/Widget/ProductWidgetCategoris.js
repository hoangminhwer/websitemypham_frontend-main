import React, { useEffect, useState } from "react";

const ProductWidgetCategories = ({ categories, totalSanPham ,onSelectCategory  }) => {
  
 
  console.log(categories);

  console.log(totalSanPham);
  return (
    <div className="product-widget">
      <h4 className="product-widget-title">Categories</h4>
      <ul className="product-widget-category">
        {categories.map((category, index) => {
          // Tìm total của danh mục này trong mảng totalSanPham
          const totalData = totalSanPham.find(
            (sanpham) => sanpham.categoryId === category.categoryId
          );

          return (
            <li key={index}>
              <a href="#" onClick={() => onSelectCategory(category.categoryId)}>
                {category.name} <span>({totalData ? totalData.total : 0})</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductWidgetCategories;
