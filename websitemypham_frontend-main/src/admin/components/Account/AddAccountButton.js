import React from "react";
import { useNavigate } from "react-router-dom";

const AddAccountButton = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/admin/account/addaccount');
  };

  return (
    <div className="col-sm-12">
      <div className="text-sm-end">
        <button className="custom-button btn-primary" type="button" onClick={handleAddProductClick}>
          <i className="mdi mdi-plus me-1"></i> Tạo tài khoản
        </button>
      </div>
    </div>
  );
};

export default AddAccountButton;
