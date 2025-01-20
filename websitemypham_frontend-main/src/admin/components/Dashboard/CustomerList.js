import React from 'react';

const CustomerList = ({ customers = [] }) => {
  return (
    <div className="card">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Khách hàng mới</h4>
        <div className="flex-shrink-0">
         
        </div>
      </div>
      <div className="card-body px-0">
        <div className="px-3" style={{ maxHeight: '386px', overflowY: 'auto' }}>
          {customers.length > 0 ? customers.map((customer, index) => (
            <div key={index} className="d-flex align-items-center pb-4">
              <div className="avatar-md me-4">
                <img src={customer.avatar} className="img-fluid rounded-circle" alt="" />
              </div>
              <div className="flex-grow-1">
                <h5 className="font-size-15 mb-1"><a href="" className="text-dark">{customer.name}</a></h5>
                <span className="text-muted">{customer.email}</span>
              </div>            
            </div>
          )) : <p>No customers found.</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
