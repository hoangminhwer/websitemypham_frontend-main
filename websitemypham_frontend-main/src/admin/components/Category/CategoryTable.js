import React from 'react';
import CategoryRow from './CategoryRow';
const CategoryTable = ({ categories }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
          <tr>
          
            <th className="align-middle">ID Danh Mục</th>
            <th className="align-middle">Tên danh mục</th>
            <th className="align-middle">Mô tả</th>
            <th className="align-middle">Xem chi tiết</th>
            <th className="align-middle">Hành động</th>
          
          </tr>
        </thead>
        <tbody>
          {categories.map(cate => (
            <CategoryRow key={cate.id} cate={cate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoryTable;