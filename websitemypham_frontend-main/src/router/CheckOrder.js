import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CheckOrder = () => {
  const [customerId, setCustomerId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Đang xử lý");

  const [cartItems, setCartItems] = useState([]);

  const [customerInfo, setCustomerInfo] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    // Lấy thông tin khách hàng từ sessionStorage
    const storedCustomerInfo = sessionStorage.getItem("InfKH");
    if (storedCustomerInfo) {
      const parsedCustomerInfo = JSON.parse(storedCustomerInfo);
      setCustomerInfo(parsedCustomerInfo);
      setCustomerId(parsedCustomerInfo.customerId);
    }

    const storedOrderDetails = sessionStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      const parsedOrderDetails = JSON.parse(storedOrderDetails);
      setOrderDetails(parsedOrderDetails);

      setOrderTotal(parsedOrderDetails.totalAmount);
      setPaymentMethod(parsedOrderDetails.paymentMethod);
      setFullName(parsedOrderDetails.fullName);
      setEmail(parsedOrderDetails.email);
      setPhone(parsedOrderDetails.phone);
      setAddress(
        parsedOrderDetails.street +
          ", " +
          parsedOrderDetails.selectedWard +
          ", " +
          parsedOrderDetails.selectedDistrict +
          ", " +
          parsedOrderDetails.selectedProvince
      );
    }

    const storedCart = JSON.parse(sessionStorage.getItem("orders")) || [];
    setCartItems(storedCart);

    // Gọi API lấy orderId mới
    const fetchOrderId = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        const response = await fetch(
          "http://localhost:8080/api/orders/nextOrderId",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.text();
          setOrderId(data);
        } else {
          console.error("Failed to fetch orderId");
        }
      } catch (error) {
        console.error("Error fetching orderId:", error);
      }
    };
    // Gọi API lấy TransactionId mới
    const fetchTransactionId = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        const response = await fetch(
          "http://localhost:8080/api/transactions/nextTransactionId",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.text();
          setTransactionId(data);
        } else {
          console.error("Failed to fetch orderId");
        }
      } catch (error) {
        console.error("Error fetching orderId:", error);
      }
    };

    fetchOrderId();
    fetchTransactionId();
  }, []);

  // Xử lý gửi đơn hàng lên BE
  const submitOrder = async () => {
    const newOrder = {
      orderId,
      customerId,
      fullName,
      email,
      phone,
      shippingAddress: address,
      paymentMethod,
      orderDate: new Date().toISOString(), // Lấy ngày hiện tại
      transactionDate:new Date().toISOString(), 
      status: "Đang xử lý", // Trạng thái mặc định
      amount: parseFloat(orderTotal),
      products: cartItems.map((item) => ({
        productId: item.productID,
        name: item.title, // Nếu sản phẩm có trường tên
        quantity: item.quantity,
        price: item.price,
      })),
    };
    const newPayment = {
      transactionId,
      orderId,
      paymentMethod,
      amount: parseFloat(orderTotal), // Đảm bảo rằng số tiền là dạng số
      transactionDate: new Date().toISOString(),
      status: "Hoàn tất",
      transactioncancelDate : new Date().toISOString(),
    };

    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });

      const responsePayment = await fetch("http://localhost:8080/api/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPayment),
      });

      if (response.ok && responsePayment.ok) {
      
        navigate("/payment-success");
      } else {
        navigate("/payment-failure");
      }
    } catch (error) {
      navigate("/payment-failure");
    }
  };

  useEffect(() => {
    if (orderId && customerId) {
      submitOrder(); // Gọi hàm để gửi đơn hàng sau khi lấy được orderId và customerId
    }
  }, [orderId, customerId]);

  return null;
};

export default CheckOrder;
