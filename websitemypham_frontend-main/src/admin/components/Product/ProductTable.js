import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, getCategoryName }) => {
  // console.log("Rendering ProductTable with products:", products);
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
          <tr>
          
            <th className="align-middle">ID Sản Phẩm</th>
            <th className="align-middle">Tên sản phẩm</th>
            <th className="align-middle">Tên danh mục</th>
            <th className="align-middle">Tồn kho</th>
            <th className="align-middle">Đã bán</th>
            <th className="align-middle">Giá bán</th>
            <th className="align-middle">Giá nhập</th>
            <th className="align-middle">Xem chi tiết</th>
            <th className="align-middle">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <ProductRow key={p.id} product={p} getCategoryName={getCategoryName} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
