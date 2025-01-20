import React, { useState } from "react";
import "./TransportRow.css";
import { useNavigate } from "react-router-dom";

const TransportRow = ({ transport }) => {
  const token = sessionStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/admin/shipments/editshipment/${transport.orderId}`);
  };

  function generateTrackingNumber(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let trackingNumber = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      trackingNumber += characters[randomIndex];
    }
    return trackingNumber;
  }
  
  const updateStatusShipmentAndOrder = async (status) => {
    try {
      let check = false;
      if (status === "Chuẩn bị hàng") {
        check = true;
      }
      if (!transport.orderId) {
        console.error("orderId is null or undefined");
        throw new Error("Order ID is missing. Cannot proceed with the update.");
      }

      const fetchResponse = await fetch(
        `http://localhost:8080/api/orders/${transport.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        console.error(`Fetch response not OK. Status: ${fetchResponse.status}`);
        const errorText = await fetchResponse.text();
        console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Error fetching order: ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentOrderData = await fetchResponse.json();

      // Prepare updated order data
      const updatedOrderData = {
        ...currentOrderData,
        status: status,
      };

      const updateResponse = await fetch(
        `http://localhost:8080/api/orders/${transport.orderId}`,
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

      const fetchShipmentResponse = await fetch(
        `http://localhost:8080/api/shipments/detail/${transport.shipmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!fetchShipmentResponse.ok) {
        const errorText = await fetchShipmentResponse.text();

        throw new Error(
          `Error fetching shipment: ${fetchShipmentResponse.status} - ${errorText}`
        );
      }

      const currentShipmentData = await fetchShipmentResponse.json();

      if (check) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 3);
        const updatedShipmentData = {
          ...currentShipmentData,
          status: status,
          carrier: "Viettel Post",
          trackingNumber: generateTrackingNumber(),
          deliveryEstimate: currentDate.toISOString(),
        };
        const updateShipmentResponse = await fetch(
          `http://localhost:8080/api/shipments/${transport.shipmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedShipmentData),
          }
        );

        if (!updateShipmentResponse.ok) {
          const errorText = await updateShipmentResponse.text();
          throw new Error(
            `Lỗi cập nhật: ${updateShipmentResponse.status} - ${errorText}`
          );
        }
      } else {
        const updatedShipmentData = {
          ...currentShipmentData,
          status: status,
        };

        const updateShipmentResponse = await fetch(
          `http://localhost:8080/api/shipments/${transport.shipmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedShipmentData),
          }
        );

        if (!updateShipmentResponse.ok) {
          const errorText = await updateShipmentResponse.text();
          throw new Error(
            `Lỗi cập nhật: ${updateShipmentResponse.status} - ${errorText}`
          );
        }
      }

      alert("Cập nhật đơn hàng thành công");
      window.location.reload();
    } catch (error) {
      console.error("Detailed error in handleConfirm:", error);
      alert(`Lỗi cập nhật đơn hàng: ${error.message}`);
    }
  };
  const handleSend = async () => {
    const isConfirmed = window.confirm(
      'Bạn có chắc chắn muốn cập nhật trạng thái thành "Đã gửi hàng" không?'
    );

    if (isConfirmed) {
      await updateStatusShipmentAndOrder("Đã gửi hàng");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      // Hoặc 'en-US' tùy vào định dạng mong muốn
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const jwtToken = token;
  const handleConfirm = async () => {
    updateStatusShipmentAndOrder("Chuẩn bị hàng");
  };
  const handleDetail = () => {
    navigate(`/admin/transport/detail/${transport.shipmentId}`);
  };

  return (
    <tr className="order-row">
      <td>{transport.orderId}</td>
      <td>{formatDate(transport.shipmentDate)}</td>

      <td>{transport.status}</td>
      <td>
        <button className="custom-button" onClick={handleDetail}>
          Xem chi tiết
        </button>
      </td>
      <td>
        <div
          className="d-flex gap-3"
          style={{ justifyContent: "space-between" }}
        >
          <a
            href="#"
            className="text-secondary"
            onClick={handleEdit}
          >
            <i className="mdi mdi-pencil font-size-18"></i>
          </a>
          <a
            href="#"
            className="text-success"
            onClick={handleConfirm}
            style={{
              visibility:
                transport.status !== "Chuẩn bị hàng" &&
                transport.status !== "Đã gửi hàng"
                  ? "visible"
                  : "hidden",
              // Ensure the invisible button still takes up space
              display: "inline-block",
            }}
          >
            <i className="mdi mdi-check-circle font-size-18"></i>
          </a>

          <a
            href="#"
            className="text-warning"
            onClick={handleSend}
            style={{
              visibility:
                transport.status !== "Đã gửi hàng" ? "visible" : "hidden",
              // Ensure the invisible button still takes up space
              display: "inline-block",
            }}
          >
            <i className="mdi mdi-package-up font-size-18"></i>
          </a>
        </div>
      </td>
    </tr>
  );
};

export default TransportRow;
