import React, { useEffect, useState } from "react";
import "./orderdetail.css";
const OrderDetail = ({ orderId, onBack }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
  
    const fetchOrderDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/orders/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Kiểm tra dữ liệu nhận được từ API
          setOrderDetail(data); // Nếu API trả về mảng, chọn phần tử đầu tiên
          console.log(orderDetail); // Kiểm tra state 'orderDetail'
        } else {
          setError("Lỗi khi lấy chi tiết đơn hàng");
        }
      } catch (error) {
        setError("Lỗi khi kết nối với server");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderDetail();
  }, [orderId]);
  
  

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="order-detail-container">
      <h2 className="section-title">Chi tiết đơn hàng</h2>
      {orderDetail ? (
        <div className="order-detail-content">
          <div className="order-info">
            <p><strong>Mã hóa đơn:</strong> {orderDetail.orderId}</p>
            <p><strong>Ngày đặt:</strong> {new Date(orderDetail.orderDate).toLocaleString()}</p>
            <p><strong>Trạng thái:</strong> {orderDetail.status}</p>
            <p><strong>Địa chỉ giao hàng:</strong> {orderDetail.shippingAddress}</p>
            <p><strong>Tổng tiền:</strong> {orderDetail.amount ? orderDetail.amount.toLocaleString("vi-VN") : "Không có tổng tiền"}</p>
          </div>

          <h3 className="product-title">Chi tiết sản phẩm</h3>
          {orderDetail.products && orderDetail.products.length > 0 ? (
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price.toLocaleString("vi-VN")}</td>
                    <td>{(product.price * product.quantity).toLocaleString("vi-VN")} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có sản phẩm trong đơn hàng.</p>
          )}

          <button onClick={onBack} className="btn btn-primary">Quay lại</button>
        </div>
      ) : (
        <p>Không tìm thấy chi tiết đơn hàng</p>
      )}
    </div>
  );
  
};

export default OrderDetail;
