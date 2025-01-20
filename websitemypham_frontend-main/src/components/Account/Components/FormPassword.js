
import React, { useState } from "react";

export const FormPassword = ({ customerInfo }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e)  => {
    e.preventDefault(); 

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return; 
    }


    if (newPassword === confirmPassword) {
      try {
        const token = sessionStorage.getItem("jwtToken");
        if (!token) {
          setMessage("Token không tồn tại. Vui lòng đăng nhập lại.");
          return;
        }
        const response = await fetch(
          `http://localhost:8080/api/update-password/${customerInfo.customerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              oldPassword,
              newPassword,
            }),
          }
        );

        const data = await response.text();
        if (response.ok) {
          alert("Mật khẩu đã được cập nhật thành công!");
          window.location.reload();
        } else {
          alert(`Lỗi : ${data}`);
        }
      } catch (error) {
        alert("Không thể kết nối đến server");
      }
    } else {
    
      alert("Mật khẩu mới không khớp");
    }
  };
  return (
    <div>
    
      <fieldset>
        <legend>Đổi mật khẩu</legend>
        <div className="single-input-item">
          <label htmlFor="current-pwd" className="required">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="single-input-item">
              <label htmlFor="new-pwd" className="required">
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single-input-item">
              <label htmlFor="confirm-pwd" className="required">
                Nhập lại mật khẩu mới
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </fieldset>
      <div className="single-input-item">
        <button className="check-btn sqr-btn" onClick={handleSubmit}>
          Cập nhật mật khẩu
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};
