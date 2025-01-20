import React, { useEffect, useState } from "react";
import "./payment.css";
const PaymentSuccess = () => {
  sessionStorage.removeItem("orders");
  sessionStorage.removeItem("cart");
  
  sessionStorage.removeItem("orderDetails");
  
  return (
    <div className="payment-success">
      <h2>Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
    </div>
  );
};

export default PaymentSuccess;
