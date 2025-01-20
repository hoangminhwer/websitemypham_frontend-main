import React from "react";
import "./style.css";
const DataTableProduct = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu</p>;
  }
  const category = data.some((item) => item.category !== undefined);
  const products = data.some((item) => item.products !== undefined);

  const product = data.some((item) => item.product !== undefined);
  const image = data.some((item) => item.image !== undefined);
  const price = data.some((item) => item.price !== undefined);

  const hasRevenue = data.some((item) => item.revenue !== undefined);
  const sold = data.some((item) => item.sold !== undefined);
  const brand = data.some((item) => item.brand !== undefined);
  const cost = data.some((item) => item.cost !== undefined);
  const profitPerUnit = data.some((item) => item.profitPerUnit !== undefined);
  return (
    <table className="table table-striped admin-report">
      <thead>
        <tr>
          {category && <th>Danh mục</th>}
          {products && <th>Tổng sản phẩm</th>}
          {product && <th>Tên sản phẩm</th>}
          {image && <th>Hình ảnh</th>}
          {price && <th>Giá bán</th>}
          {cost && <th>Chi phí</th>}
          {profitPerUnit && <th>Lợi nhuận</th>}
          {brand && <th>Thương hiệu</th>}
          {sold && <th>Số lượng bán</th>}
          {hasRevenue && <th>Doanh thu</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {category && <td>{row.category}</td>}
            {products && <td>{row.products}</td>}
            {product && (
              <td className="product-name" title={row.product}>{row.product}</td> /* Độ rộng cố định cho tên sản phẩm, hiển thị tooltip nếu dài */
            )}
            {image && (
              <td>
                <img
                  src={row.image}
                  alt="image"
                  className="image-report-admin"
                />
              </td>
            )}
            {price && <td>{row.price}</td>}
            {cost && <td>{row.cost}</td>}
            {profitPerUnit && <td>{row.profitPerUnit}</td>}
            {brand && <td>{row.brand}</td>}
            {sold && <td>{row.sold}</td>}
            {hasRevenue && <td>{row.revenue}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableProduct;
