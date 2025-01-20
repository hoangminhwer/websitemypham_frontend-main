import React from 'react';
import PaymentRow from "./PaymentRow";


const PaymentTable = ({ payments }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
        <tr>
          <th style={{width: '20px'}} className="align-middle">
            <div className="form-check font-size-16">
              <input className="form-check-input" type="checkbox" id="checkAll"/>
              <label className="form-check-label" htmlFor="checkAll"></label>
            </div>
          </th>
          <th className="align-middle">Payment ID</th>
          <th className="align-middle">Order Id</th>
          <th className="align-middle">paymentMethod</th>
          <th className="align-middle">amount</th>
          <th className="align-middle">transactionDate</th>
          <th className="align-middle">status</th>
          <th className="align-middle">Action</th>
        </tr>
        </thead>
        <tbody>
        {payments.map(a => (
            <PaymentRow key={a.id} payment={a} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
