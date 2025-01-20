import React from "react";
import "./payment.css";
const PaymentFaild = () => {
  sessionStorage.removeItem("orders");


  return (
    <div className="payment-failure">
      <h2>Thanh toán không thành công!</h2>
      <p>Lỗi thanh toán</p>
    </div>
  );
};

export default PaymentFaild;
