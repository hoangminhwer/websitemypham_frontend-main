import React from "react";
import { useNavigate } from "react-router-dom";

const AddPaymentButton = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('');
  };

  return (
    <div className="col-sm-8">
      <div className="text-sm-end">
        <button className="custom-button btn-primary" type="button" onClick={handleAddProductClick}>
          <i className="mdi mdi-plus me-1"></i> Tạo giao dịch
        </button>
      </div>
    </div>
  );
};

export default AddPaymentButton;
