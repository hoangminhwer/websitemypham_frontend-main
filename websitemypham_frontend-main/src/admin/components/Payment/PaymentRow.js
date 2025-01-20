import React from 'react';
import "./PaymentRow.css";
import {useNavigate} from "react-router-dom";
import PaymentTable from "./PaymentTable";

const PaymentRow = ({ payment }) => {
    const navigate = useNavigate();
    const handleEdit=()=>{
        navigate();
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { // Hoặc 'en-US' tùy vào định dạng mong muốn
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

  return (
      <tr className="order-row">
          <td>
              <div className="form-check font-size-16">
                  <input className="form-check-input" type="checkbox" id={`orderidcheck${payment.id}`}/>
                  <label className="form-check-label" htmlFor={`orderidcheck${payment.id}`}></label>
              </div>
          </td>
          <td>
              <a href="#" className="text-body fw-bold">
                  {payment.paymentId}
              </a>
          </td>
          <td>{payment.orderId}</td>
          <td>{payment.paymentMethod}</td>
          <td>{payment.amount}</td>
          <td>
              {formatDate(payment.transactionDate)}
          </td>
          <td>
              <div className="d-flex gap-3">
                  <a href="#" className="text-success" onClick={handleEdit}>
                      <i className="mdi mdi-pencil font-size-18"></i>
                  </a>
                  <a href="#" className="text-danger">
                      <i className="mdi mdi-delete font-size-18"></i>
                  </a>
              </div>
          </td>
      </tr>
  );
};

export default PaymentRow;
