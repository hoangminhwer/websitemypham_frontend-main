import React from 'react';
import TransportRow from './TransportRow';


const TransportTable = ({ transports }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-check">
        <thead className="table-light">
        <tr>
     
          <th className="align-middle">ID Đơn hàng</th>
          <th className="align-middle">Ngày vận chuyển</th>
          <th className="align-middle">Trạng thái</th>
          <th className="align-middle">Xem chi tiết</th>
          <th className="align-middle">Hành động</th>
        </tr>
        </thead>
        <tbody>
        {transports.map(transport => (
            <TransportRow key={transport.id} transport={transport} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportTable;
