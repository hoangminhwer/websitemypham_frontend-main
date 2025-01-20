import React, { useEffect, useState } from "react";

import DataTableOrder from "./DataTableOrder";
import PaginationReportAdmin from "../PaginationReportAdmin";

const CustomerOrderReport = () => {
  const [activeTag, setActiveTag] = useState("customerOrder");
  const [totalOrderCustomer, setTotalOrderCustomer] = useState([]);
  const [totalRevenueProduct, setTotalRevenueProduct] = useState([]);
  const [totalorderCanCel, setTotalorderCanCel] = useState([]);
  const [error, setError] = useState(null);

  // Thêm phân trang cho price analysis
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5); // PageSize cố định cho tất cả các tab

  const token = sessionStorage.getItem("jwtToken");
  const fetchTotalRevenueProduct = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/revenue-statistics?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch best-selling products data");
      }

      const data = await response.json();
      setTotalRevenueProduct(
        data.content.map((item) => ({
          name: item.name,
          soldOut: item.soldQuantity,
          price: item.price,
          revenue: item.totalRevenue,
        }))
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };
  const fetchTotalOrderCustomer = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/order-statistics?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch best-selling products data");
      }

      const data = await response.json();
      setTotalOrderCustomer(
        data.content.map((item) => ({
          nameKH: item.customerName,
          totalOrder: item.totalOrders,
          totalBuy: item.totalAmount,
        }))
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };
  const fetchTotalorderCanCel = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/canceled-orders?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch best-selling products data");
      }

      const data = await response.json();
      setTotalorderCanCel(
        data.content.map((item) => ({
          orderId: item.orderId,
          nameKH: item.customerName,
          total: item.amount,
          orderDate: item.orderDate,
        }))
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };
  // const revenuebyproduct = [
  //   { name: "Sản phẩm 1", soldOut: 5, price: 255000, revenue: 560000 },
  //   { name: "Sản phẩm 1", soldOut: 5, price: 255000, revenue: 560000 },
  //   { name: "Sản phẩm 1", soldOut: 5, price: 255000, revenue: 560000 },
  //   { name: "Sản phẩm 1", soldOut: 5, price: 255000, revenue: 560000 },
  // ];
  //
  // const totalOrderCustomer = [
  //   {
  //     nameKH: "Nguyễn Văn An",
  //     totalOrder: 20,
  //     totalBuy: 2000000,
  //   },
  //   {
  //     nameKH: "Nguyễn Văn An",
  //     totalOrder: 20,
  //     totalBuy: 2000000,
  //   },
  //   {
  //     nameKH: "Nguyễn Văn An",
  //     totalOrder: 20,
  //     totalBuy: 2000000,
  //   },
  //   {
  //     nameKH: "Nguyễn Văn An",
  //     totalOrder: 20,
  //     totalBuy: 2000000,
  //   },
  // ];
  // const orderCanCel = [
  //   {
  //     orderId: "001",
  //     name: "Sản phẩm mặc định",
  //     nameKH: "Nguyễn Văn An",
  //     total: 200000,
  //     orderDate: "17/05/2024",
  //   },
  //   {
  //     orderId: "001",
  //     name: "Sản phẩm mặc định",
  //     nameKH: "Nguyễn Văn An",
  //     total: 200000,
  //     orderDate: "17/05/2024",
  //   },
  //   {
  //     orderId: "001",
  //     name: "Sản phẩm mặc định",
  //     nameKH: "Nguyễn Văn An",
  //     total: 200000,
  //     orderDate: "17/05/2024",
  //   },
  //   {
  //     orderId: "001",
  //     name: "Sản phẩm mặc định",
  //     nameKH: "Nguyễn Văn An",
  //     total: 200000,
  //     orderDate: "17/05/2024",
  //   },
  // ];

  useEffect(() => {
    setError(null);

    if (activeTag === "customerOrder") {
      fetchTotalRevenueProduct(currentPage, pageSize);
    } else if (activeTag === "totalOrder") {
      fetchTotalOrderCustomer(currentPage, pageSize);
    } else if (activeTag === "orderCanCel") {
      fetchTotalorderCanCel(currentPage, pageSize);
    }
  }, [activeTag, currentPage, pageSize, token]);
  const handlePageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
  };

  return (
    <div>
      <div>
        <div className="tags">
          <span
            className={activeTag === "customerOrder" ? "active-tag" : "tag"}
            onClick={() => setActiveTag("customerOrder")}
          >
            Tổng doanh thu theo từng sản phẩm
          </span>
          <span
            className={activeTag === "totalOrder" ? "active-tag" : "tag"}
            onClick={() => setActiveTag("totalOrder")}
          >
            Tổng số đơn hàng và tổng số tiền của mỗi khách hàng
          </span>
          <span
            className={activeTag === "orderCanCel" ? "active-tag" : "tag"}
            onClick={() => setActiveTag("orderCanCel")}
          >
            Thống kê đơn hàng bị hủy
          </span>
        </div>

        {/* Dữ liệu và bảng thay đổi dựa vào tag được chọn */}
        {activeTag === "customerOrder" && (
          <div>
            <DataTableOrder data={totalRevenueProduct} />
            <PaginationReportAdmin
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {activeTag === "totalOrder" && (
          <div>
            <DataTableOrder data={totalOrderCustomer} />
            <PaginationReportAdmin
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {activeTag === "orderCanCel" && (
          <div>
            <DataTableOrder data={totalorderCanCel} />
            <PaginationReportAdmin
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderReport;
