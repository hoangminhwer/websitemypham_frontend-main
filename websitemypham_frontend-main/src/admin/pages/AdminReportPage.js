import React, { useEffect, useState } from "react";

import PaginationTransactionAdmin from "../components/Transaction/PaginationTransactionAdmin";
import axios from "axios";

import { Tabs, Tab, Container } from "react-bootstrap";
import CustomerOrderReport from "../components/Report/CustomerOrder/CustomerOrderReport";
import ShippingTransactionReport from "../components/Report/ShippingTransaction/ShippingTransactionReport";

import ProductReport from "../components/Report/Product/ProductReport";
import "./AdminReport.css";
const AdminReportPage = () => {
  const token = sessionStorage.getItem("jwtToken");
  const jwt = token;
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState("products");
  const productData = [
    {
      company: "Shop 1",
      customer: "Customer A",
      sales: 3000,
      revenue: 12000,
      profit: "50%",
    },
    {
      company: "Shop 2",
      customer: "Customer B",
      sales: 1500,
      revenue: 8000,
      profit: "40%",
    },
  ];

  return (
    <div className="row">
      <div className="col-12">
        <h3 className="mb-3">Báo cáo thống kê</h3>

        <Tabs
          id="report-tabs"
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          className="mb-3"
        >
          <Tab eventKey="products" title="Sản phẩm và Danh mục">
            <ProductReport />
          </Tab>
          <Tab eventKey="customers" title="Khách hàng và Đơn hàng">
            <CustomerOrderReport />
          </Tab>
          {/* <Tab eventKey="shipping" title="Vận chuyển và Giao dịch">
            <ShippingTransactionReport />
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
};
export default AdminReportPage;
