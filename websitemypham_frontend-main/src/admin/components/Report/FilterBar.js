// components/FilterBar.js
import React from 'react';
import "./Fillter.css";
const FilterBar = () => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <select className="form-select w-25">
        <option value="month">Tháng</option>
        <option value="year">Năm</option>
      </select>

      <input type="date" className="form-control w-25" />
      <input type="date" className="form-control w-25" />

      <select className="form-select w-25">
        <option value="all">Tất cả khách hàng</option>
        <option value="customer1">Khách hàng 1</option>
      </select>

      <button className=" btn-custom btn-search">Tìm kiếm</button>
      <button className=" btn-custom btn-excel">Xuất Excel</button>
    </div>
  );
};

export default FilterBar;
