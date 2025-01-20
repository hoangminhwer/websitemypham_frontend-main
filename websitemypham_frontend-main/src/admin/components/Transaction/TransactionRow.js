import React from 'react';
import "./TransactionRow.css";
import {useNavigate} from "react-router-dom";
import TransactionTable from "./TransactionTable";

const TransactionRow = ({ transaction }) => {
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
              <a href="#" className="text-body fw-bold">
                  {transaction.transactionId}
              </a>
          </td>
          <td>{transaction.orderId}</td>
          <td>{transaction.paymentMethod}</td>
          <td>{transaction.amount}</td>
          <td>
              {formatDate(transaction.transactionDate)}
          </td>
          <td>{transaction.status}</td>

          {/* <td>
              <div className="d-flex gap-3">
                  <a href="#" className="text-success" onClick={handleEdit}>
                      <i className="mdi mdi-pencil font-size-18"></i>
                  </a>
                  <a href="#" className="text-danger">
                      <i className="mdi mdi-delete font-size-18"></i>
                  </a>
              </div>
          </td> */}
      </tr>
  );
};

export default TransactionRow;
