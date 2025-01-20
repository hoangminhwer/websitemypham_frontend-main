import React, { useEffect, useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import MarketOverview from "../components/Dashboard/MarketOverview";
import CustomerList from "../components/Dashboard/CustomerList";
import SellingProducts from "../components/Dashboard/SellingProducts";

const DashboardPage = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("jwtToken");
  useEffect(() => {
   
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/customers/top5",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token qua Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await response.json(); // Chuyển dữ liệu thành JSON
        setCustomers(data); // Lưu dữ liệu khách hàng vào state
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/top6', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Gửi token qua Authorization header
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json(); // Chuyển dữ liệu thành JSON
        setProducts(data); // Lưu dữ liệu sản phẩm vào state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, [token]);

 

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <DashboardCard
          title="Total Sales"
          value="$354.5k"
          badgeText="+$20.9k"
          badgeColor="bg-success-subtle"
          description="Since last week"
          chartId="mini-chart1"
        />
        <DashboardCard
          title="Total Items"
          value="1256"
          badgeText="-29 Trades"
          badgeColor="bg-danger-subtle"
          description="Since last week"
          chartId="mini-chart2"
        />
        <DashboardCard
          title="Average Sales"
          value="$7.54M"
          badgeText="+ $2.8k"
          badgeColor="bg-success-subtle"
          description="Since last week"
          chartId="mini-chart3"
        />
        <DashboardCard
          title="Order Delivery"
          value="18.34%"
          badgeText="+5.32%"
          badgeColor="bg-success-subtle"
          description="Since last week"
          chartId="mini-chart4"
        /> */}
      </div>

       <div className="row">
        <div className="col-xl-12">
          <MarketOverview />
        </div>
      </div> 

      <div className="row">
        <div className="col-xl-5">
          <CustomerList customers={customers} />
        </div>
        <div className="col-xl-7">
          <SellingProducts products={products} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
