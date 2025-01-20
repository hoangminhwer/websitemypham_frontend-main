// components/Summary.js
import React from 'react';

const Summary = () => {
  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Doanh thu</h5>
            <p className="card-text">548,024,486 VND</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Số đơn hàng</h5>
            <p className="card-text">0</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Lợi nhuận</h5>
            <p className="card-text">548,024,486 VND</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
