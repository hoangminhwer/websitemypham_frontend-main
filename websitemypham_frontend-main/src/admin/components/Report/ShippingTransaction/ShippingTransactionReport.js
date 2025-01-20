// components/ShippingTransactionReport.js
import React from 'react';

import DataTableShipping from './DataTableShipping';



const sampleData = [
  {
    'Order ID': 'O001',
    'Transaction Status': 'Hoàn tất',
    'Transaction Date': '2024-08-01',
    'Shipment Status': 'Chưa vận chuyển',
    'Shipment Date': null,
    'Delivery Estimate': 'Chưa vận chuyển',
    'Delivery Time (Days)': 'Chưa vận chuyển'
  },
  {
    'Order ID': 'O002',
    'Transaction Status': 'Chưa thanh toán',
    'Transaction Date': 'Chưa thanh toán',
    'Shipment Status': 'Đã gửi hàng',
    'Shipment Date': '2024-08-03',
    'Delivery Estimate': '2024-08-05 00:00:00',
    'Delivery Time (Days)': 2
  }
];

const ShippingTransactionReport = () => {
  return (
    <div>  
      <DataTableShipping data={sampleData} />
    </div>
  );
};

export default ShippingTransactionReport;
