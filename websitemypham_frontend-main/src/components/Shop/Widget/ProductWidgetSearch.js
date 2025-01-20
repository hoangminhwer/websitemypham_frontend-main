import React, { useState } from 'react';

const ProductWidgetSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Gửi từ khóa tìm kiếm lên component cha
  };

  return (
    <div className="product-widget-search">
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Search Here"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
    </div>
  );
}

export default ProductWidgetSearch;
