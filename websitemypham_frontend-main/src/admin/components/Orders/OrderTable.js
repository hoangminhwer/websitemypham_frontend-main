import React from 'react';
import OrderRow from './OrderRow';

const OrderTable = ({ orders,getCustomerName }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
          <tr>
          
            <th className="align-middle">ID Đơn hàng</th>
            <th className="align-middle">Tên khách hàng</th>
            <th className="align-middle">Ngày đặt</th>
            <th className="align-middle">Tổng tiền</th>
            <th className="align-middle">Trạng thái</th>
            <th className="align-middle">Phương thức thanh toán</th>
            <th className="align-middle">Xem chi tiết</th>
            <th className="align-middle">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderRow key={order.id} order={order} getCustomerName={getCustomerName}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
