import React, { useEffect, useState } from "react";
import BarChart from "../../../util/components/BarChart";

const MarketOverview = () => {

  const colors = ["#00E396"];
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken"); // Lấy token từ sessionStorage

    fetch("http://localhost:8080/api/orders/profit/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Gửi kèm token trong header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Danh sách đủ 12 tháng từ 1 đến 12 (tháng dưới dạng số)
        const allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        // Tạo một object để dễ dàng kiểm tra và gán giá trị
        const monthData = {};
        data.forEach((item) => {
          monthData[item.month] = item.profit; // item.month là số tháng (1, 2, 3,...)
        });

        // Tạo dữ liệu đủ 12 tháng, với các tháng không có dữ liệu sẽ là 0
        const profits = allMonths.map((month) => {
          return monthData[month] || 0; // Nếu không có dữ liệu cho tháng thì gán 0
        });

        // Gán dữ liệu vào series và categories
        setSeries([{ name: "Doanh thu", data: profits }]);
        setCategories(allMonths);
      })
      .catch((error) => console.error("Error fetching profit data:", error));
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center mb-4">
          <h5 className="card-title me-2">Biểu đồ doanh thu tháng</h5>
        </div>
        <div className="row align-items-center">
          <div className="col-xl-12">
            <BarChart series={series} colors={colors} categories={categories} />
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
