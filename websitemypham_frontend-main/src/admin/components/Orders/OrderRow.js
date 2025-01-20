import React, { useState, useEffect } from "react";
import "./OrderRow.css";
import { useNavigate } from "react-router-dom";
import { isVisible } from "bootstrap/js/src/util";

import response from "feather-icons";

const OrderRow = ({ order, getCustomerName }) => {
  const token = sessionStorage.getItem("jwtToken");
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    orderId: "",
    customerId: "",
    products: [
      {
        productId: "",
        name: "",
        quantity: 0,
        price: 0.0,
      },
    ],
    orderDate: "",
    status: "",
    totalAmount: 0.0,
    shippingAddress: "",
    fullName: "",
    phone: "",
    email: "",
  });
  const jwtToken = token;
  // console.log("Authorization Token:", token);

  const handleSuccess = async (oId) => {
    try {
      if (!oId) {
        // console.error('orderId is null or undefined');
        throw new Error("Order ID is missing. Cannot proceed with the update.");
      }

      const fetchResponse = await fetch(
        `http://localhost:8080/api/orders/${oId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        // console.error(`Fetch response not OK. Status: ${fetchResponse.status}`);
        const errorText = await fetchResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error fetching order: ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentOrderData = await fetchResponse.json();
      // console.log('Fetched current order data:', currentOrderData);

      // Prepare updated order data
      const updatedOrderData = {
        ...currentOrderData,
        status: "Đã nhận hàng",
      };
      // console.log('Prepared updated order data:', updatedOrderData);

      // Send PUT request to update the order
      // console.log('Sending PUT request to update order');
      const updateResponse = await fetch(
        `http://localhost:8080/api/orders/${oId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedOrderData),
        }
      );

      if (!updateResponse.ok) {
        // console.error(`Update response not OK. Status: ${updateResponse.status}`);
        const errorText = await updateResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error updating order: ${updateResponse.status} - ${errorText}`
        );
      }

      // console.log('Order status updated successfully');
      alert("Cập nhật đơn hàng thành công");
      await pushToTransation(response.data);
    } catch (error) {
      // console.error('Detailed error in handleConfirm:', error);
      alert(`Lỗi cập nhật: ${error.message}`);
    }
  };
  const getSizeTransaction = async () => {
    try {
      const fetchResponse = await fetch(
        `http://localhost:8080/api/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        // console.error(`Fetch response not OK. Status: ${fetchResponse.status}`);
        const errorText = await fetchResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Cannot get size array shipments: ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentData = await fetchResponse.json();
      // console.log('Fetched current data:', currentData);

      // console.log('size array shipments:', currentData.length);
      const sizeArray = currentData.length;
      return sizeArray;
    } catch (error) {
      alert(`Error get size: ${error.message}`);
    }
  };
  const generateTransactionID = async () => {
    try {
      const number = (await getSizeTransaction()) + 1;
      const text = "T";
      const formatNumber = number.toString().padStart(3, "0");
      const newShipmentID = text + formatNumber;
      return newShipmentID;
    } catch (error) {
      // console.error('Error generating shipment ID:', error);
      return null;
    }
  };
  const pushToTransation = async (order) => {
    const transactionId = await generateTransactionID();

    const transactionData = {
      transactionId: transactionId,
      orderId: order.orderId,
      paymentMethod: order.paymentMethod,
      amount: order.amount,
      transactionDate: order.transactionDate,
      transactioncancelDate: "",
      status: order.status,
    };
    //
    // console.log("order id", orderId);
    try {
      const fetchTransactionResponse = await fetch(
        `http://localhost:8080/api/transactions/${order.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchTransactionResponse.ok) {
        // console.error(`Fetch shipment response not OK. Status: ${fetchTransactionResponse.status}`);
        const errorText = await fetchTransactionResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error fetching shipment: ${fetchTransactionResponse.status} - ${errorText}`
        );
      }

      const responseBody = await fetchTransactionResponse.text(); // Lấy body dưới dạng văn bản
      // console.log("dsf",responseBody);

      // console.log("truong hop them moi shipment");
      try {
        const response = await fetch(`http://localhost:8080/api/transactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        // console.log('Success:', data);
        window.alert("Add shipments successful!");
      } catch (error) {
        // console.error('Error:', error);
      }
    } catch (error) {
      // console.error('Error:', error);
    }
  };
  const pushToShipment = async (updatedOrderData) => {
    const shipmentId = await generateShipmentID();

    const shipmentData = {
      shipmentId: shipmentId,
      orderId: updatedOrderData.orderId,
      carrier: "",
      trackingNumber: "",
      shipmentDate: updatedOrderData.orderDate,
      deliveryEstimate: "",
      status: "Đã xác nhận",
    };

    // console.log("order id", orderId);
    try {
      const fetchShipmentResponse = await fetch(
        `http://localhost:8080/api/shipments/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchShipmentResponse.ok) {
        // console.error(`Fetch shipment response not OK. Status: ${fetchShipmentResponse.status}`);
        const errorText = await fetchShipmentResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error fetching shipment: ${fetchShipmentResponse.status} - ${errorText}`
        );
      }

      const responseBody = await fetchShipmentResponse.text(); // Lấy body dưới dạng văn bản
      // console.log("dsf",responseBody);
      if (responseBody === "null") {
        // console.log("No shipment found for this order ID.");

        // console.log("truong hop them moi shipment");
        try {
          const response = await fetch(`http://localhost:8080/api/shipments`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(shipmentData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Network response was not ok: ${response.status} - ${errorText}`
            );
          }

          const data = await response.json();
          // console.log('Success:', data);
          window.alert("Thêm vận chuyển thành công");
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        {
          const currentShipmentData = JSON.parse(responseBody);
          // Prepare updated shipment data
          const updatedShipmentData = {
            ...currentShipmentData,
            status: "Đã xác nhận",
          };
          // console.log('Prepared updated shipment data:', updatedShipmentData);

          const updateShipmentResponse = await fetch(
            `http://localhost:8080/api/shipments/${updatedShipmentData.shipmentId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify(updatedShipmentData),
            }
          );

          if (!updateShipmentResponse.ok) {
            // console.error(`Update shipment response not OK. Status: ${updateShipmentResponse.status}`);
            const errorText = await updateShipmentResponse.text();
            // console.error(`Error response text: ${errorText}`);
            throw new Error(
              `Error updating shipment: ${updateShipmentResponse.status} - ${errorText}`
            );
          }
          window.alert("Cập nhật vận chuyển thành công");
        }
      }
    } catch (error) {
      // console.error('Error:', error);
    }
  };
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this ORDER?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      if (!order.orderId) {
        console.error("orderId is null or undefined");
        throw new Error("Order ID is missing. Cannot proceed with the update.");
      }
      const fetchResponse = await fetch(
        `http://localhost:8080/api/orders/${order.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();
        throw new Error(
          `Error fetching order: ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentOrderData = await fetchResponse.json();

      const updatedOrderData = {
        ...currentOrderData,
        status: "Đã huỷ",
      };
      const updateResponse = await fetch(
        `http://localhost:8080/api/orders/${order.orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedOrderData),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(
          `Error updating order: ${updateResponse.status} - ${errorText}`
        );
      }

      alert("Cập nhật đơn hàng thành công");
      try {
        const fetchShipmentResponse = await fetch(
          `http://localhost:8080/api/shipments/${order.orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!fetchShipmentResponse.ok) {
          const errorText = await fetchShipmentResponse.text();
          throw new Error(
            `Error fetching shipment: ${fetchShipmentResponse.status} - ${errorText}`
          );
        }

        const responseBody = await fetchShipmentResponse.text(); // Lấy body dưới dạng văn bản

        const currentShipmentData = JSON.parse(responseBody);
        const updatedShipmentData = {
          ...currentShipmentData,
          status: "Đã huỷ",
        };

        const updateShipmentResponse = await fetch(
          `http://localhost:8080/api/shipments/${updatedShipmentData.shipmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(updatedShipmentData),
          }
        );

        if (!updateShipmentResponse.ok) {
          const errorText = await updateShipmentResponse.text();

          throw new Error(
            `Error updating shipment: ${updateShipmentResponse.status} - ${errorText}`
          );
        }
        alert("Cập nhật vận chuyển thành công");

        // Bước 3: Cập nhật trạng thái transaction thành "Đã hoàn tiền"
        const transactionResponse = await fetch(
          `http://localhost:8080/api/transactions/refund/${order.orderId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!transactionResponse.ok) {
          const errorText = await transactionResponse.text();
          throw new Error(
            `Error updating transaction: ${transactionResponse.status} - ${errorText}`
          );
        }
        window.alert("Cập nhật giao dịch thành công: Đã hoàn tiền");
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      alert(`Error updating order status: ${error.message}`);
    }
    window.location.reload();
  };
  const handleConfirm = async () => {
    try {
      // console.log('order id lA:',order.orderId);
      if (!order.orderId) {
        // console.error('orderId is null or undefined');
        throw new Error("Order ID is missing. Cannot proceed with the update.");
      }
      // Fetch current order data
      // console.log(`Fetching order data for orderId: ${order.orderId}`);
      const fetchResponse = await fetch(
        `http://localhost:8080/api/orders/${order.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        // console.error(`Fetch response not OK. Status: ${fetchResponse.status}`);
        const errorText = await fetchResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error fetching order: ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentOrderData = await fetchResponse.json();
      // console.log('Fetched current order data:', currentOrderData);

      // Prepare updated order data
      const updatedOrderData = {
        ...currentOrderData,
        status: "Đã xác nhận",
      };
      // console.log('Prepared updated order data:', updatedOrderData);

      // Send PUT request to update the order
      // console.log('Sending PUT request to update order');
      const updateResponse = await fetch(
        `http://localhost:8080/api/orders/${order.orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedOrderData),
        }
      );

      if (!updateResponse.ok) {
        // console.error(`Update response not OK. Status: ${updateResponse.status}`);
        const errorText = await updateResponse.text();
        // console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error updating order: ${updateResponse.status} - ${errorText}`
        );
      }

      alert("Xác nhận đơn hàng thành công");
      await pushToShipment(updatedOrderData);

      // You might want to refresh the order list or update the UI here
    } catch (error) {
      alert(`Cập nhật đơn hàng không thành công: ${error.message}`);
    }
  };
  const getSizeShipment = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:8080/api/shipments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();

        throw new Error(
          `Cannot get size array shipments: ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentData = await fetchResponse.json();

      const sizeArrayShipments = currentData.length;
      return sizeArrayShipments;
    } catch (error) {
      alert(`Error get size: ${error.message}`);
    }
  };
  const generateShipmentID = async () => {
    try {
      const number = (await getSizeShipment()) + 1;
      const text = "S";
      const formatNumber = number.toString().padStart(3, "0");
      const newShipmentID = text + formatNumber;
      return newShipmentID;
    } catch (error) {
      console.error("Error generating shipment ID:", error);
      return null;
    }
  };
  const handleDetail = () => {
    if (order.orderId) {
      navigate(`/admin/order/detail/${order.orderId}`);
    } else {
      console.error("Order ID is null or undefined");
    }
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  }
  return (
    <tr className="order-row">
      <td>
        <a href="#" className="text-body fw-bold">
          {order.orderId}
        </a>
      </td>
      <td>{getCustomerName(order.customerId)}</td>
      <td>{formatDate(order.orderDate)}</td>
      <td>{order.totalAmount}</td>
      <td>{order.status}</td>
      <td>{order.paymentMethod}</td>
      <td>
        <button className="custom-button" onClick={handleDetail}>
          Xem chi tiết
        </button>
      </td>
      <td>
        <div className="d-flex gap-3">
          <a
            href="#"
            className="text-success"
            onClick={handleConfirm}
            style={{
              visibility:
                order.status !== "Đã giao hàng" &&
                order.status !== "Đã huỷ" &&
                order.status !== "Đã hủy" &&
                order.status !== "Đã xác nhận" &&
                order.status !== "Chuẩn bị hàng" &&
                order.status !== "Đã gửi hàng"
                  ? "visible"
                  : "hidden",
              display: "inline-block",
            }}
          >
            <i className="mdi mdi-check-circle-outline font-size-18"></i>
          </a>
          <a
            href="#"
            className="text-danger"
            style={{
              visibility:
                order.status !== "Đã giao hàng" &&
                order.status !== "Đã huỷ" &&
                order.status !== "Đã hủy" &&
                order.status !== "Đã gửi hàng"
                  ? "visible"
                  : "hidden",
              display: "inline-block",
            }}
            onClick={handleDelete}
          >
            <i className="mdi mdi-delete font-size-18"></i>
          </a>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
