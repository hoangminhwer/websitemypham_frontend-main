import React, { useState } from "react";

const DataTableOrder = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu</p>;
  }
  const name = data.some((item) => item.name !== undefined);
  const soldOut = data.some((item) => item.soldOut !== undefined);
  const price = data.some((item) => item.price !== undefined);
  const revenue = data.some((item) => item.revenue !== undefined);

  const nameKH = data.some((item) => item.nameKH !== undefined);
  const totalOrder = data.some((item) => item.totalOrder !== undefined);
  const totalBuy = data.some((item) => item.totalBuy !== undefined);

  const orderId = data.some((item) => item.orderId !== undefined);
  const total = data.some((item) => item.total !== undefined);
  const orderDate = data.some((item) => item.orderDate !== undefined);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {orderId && <th>Mã đơn hàng</th>}
          {name && <th>Tên sản phẩm</th>}
          {soldOut && <th>Số lượng đã bán</th>}
          {price && <th>Giá bán</th>}
          {revenue && <th>Tổng doanh thu</th>}
          {nameKH && <th>Tên khách hàng</th>}
          {totalOrder && <th>Tổng số đơn hàng</th>}
          {totalBuy && <th>Tổng chi tiêu</th>}

          {total && <th>Tông tiền</th>}
          {orderDate && <th>Ngày đặt hàng</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {orderId && <td>{row.orderId}</td>}
            {name && <td>{row.name}</td>}
            {soldOut && <td>{row.soldOut}</td>}
            {price && <td>{row.price}</td>}
            {revenue && <td>{row.revenue}</td>}
            {nameKH && <td>{row.nameKH}</td>}
            {totalOrder && <td>{row.totalOrder}</td>}
            {totalBuy && <td>{row.totalBuy}</td>}

            {total && <td>{row.total}</td>}
            {orderDate && <td>{row.orderDate}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableOrder;
