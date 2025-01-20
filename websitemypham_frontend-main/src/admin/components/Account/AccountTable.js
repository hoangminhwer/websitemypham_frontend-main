import React from 'react';
import AccountRow from './AccountRow';


const AccountTable = ({ customers }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
          <tr>
        
            <th className="align-middle">ID Tài Khoản</th>
            <th className="align-middle">Họ và tên</th>
            <th className="align-middle">Số điện thoại</th>
            <th className="align-middle">Ảnh đại diện</th>
            <th className="align-middle">Địa chỉ</th>

            <th className="align-middle">Xem chi tiết</th>
            <th className="align-middle">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <AccountRow key={customer.id} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
