import React from "react";
import ProductWidget from "./Widget/ProductWidget";
import ProductWidgetSearch from "./Widget/ProductWidgetSearch";
import ProductWidgetCategories from "./Widget/ProductWidgetCategoris";
import ProductWidgetFilter from "./Widget/ProductWidgetFilter";



const ProductSidebar = ({ onSearch, onFilterChange , categories , totalSanPham,onSelectCategory  }) => {
  return (
    <div className="product-sidebar-widget">
      <ProductWidgetSearch onSearch={onSearch} />
      <ProductWidgetFilter onFilterChange={onFilterChange} />
      <ProductWidgetCategories categories={categories} totalSanPham={totalSanPham} onSelectCategory={onSelectCategory}   />
    </div>
  );
};

export default ProductSidebar;
