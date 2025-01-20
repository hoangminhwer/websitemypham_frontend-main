import React from 'react';
import TransactionRow from "./TransactionRow";


const TransactionTable = ({ transaction }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
        <tr>
        
          <th className="align-middle">ID Giao dịch</th>
          <th className="align-middle">ID Đơn hàng</th>
          <th className="align-middle">Phương thức thanh toán</th>
          <th className="align-middle">Tổng tiền</th>
          <th className="align-middle">Ngày thanh toán</th>
          <th className="align-middle">Trạng thái</th>
          {/* <th className="align-middle">Hành động</th> */}
        </tr>
        </thead>
        <tbody>
        {transaction.map(a => (
            <TransactionRow key={a.id} transaction={a} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
