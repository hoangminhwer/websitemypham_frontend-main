import React, { useState, useEffect } from "react";
import './ProductWidgetFilterButtons.css';  // Đảm bảo import tệp CSS của bạn

const ProductWidgetFilterButtons = ({ onFilterChange }) => {
  const [selectedRange, setSelectedRange] = useState(null);

  const priceRanges = [
    { label: "50,000 - 100,000 VND", min: 50000, max: 100000 },
    { label: "100,000 - 500,000 VND", min: 100000, max: 500000 },
    { label: "500,000 - 1,000,000 VND", min: 500000, max: 1000000 },
    { label: "Trên 1,000,000 VND", min: 1000000, max: null },
  ];

  const handleButtonClick = (range) => {
    setSelectedRange(range);
    onFilterChange(range); // Truyền range lên component cha để xử lý filter
  };

  return (
    <div className="product-widget">
      <h4 className="product-widget-title">Price Filter</h4>
      <div className="product-widget-buttons">
        {priceRanges.map((range, index) => (
          <button
            key={index}
            className={`custom-price-button ${selectedRange === range ? 'active' : ''}`}
            onClick={() => handleButtonClick(range)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductWidgetFilterButtons;
