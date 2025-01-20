// components/DataTableShipping.js
import React from "react";

const DataTableShipping = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu</p>;
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return "Chưa có dữ liệu"; // Xử lý giá trị null hoặc undefined
    }
    if (typeof value === "string" && value.includes("00:00:00")) {
      return value.split(" ")[0]; // Xử lý chuỗi ngày giờ, chỉ hiển thị ngày
    }
    return value; // Trả về giá trị gốc nếu không có gì để thay đổi
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {/* {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))} */}
          <th>Mã đơn hàng</th>
          <th>Trạng thái thanh toán</th>
          <th>Ngày thanh toán</th>
          <th>Trạng thái vận chuyển</th>
          <th>Ngày gửi</th>
          <th>Ngày giao hàng dự kiến</th>
          <th>Thời gian giao hàng</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, i) => (
              <td key={i}>{formatValue(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTableShipping;
