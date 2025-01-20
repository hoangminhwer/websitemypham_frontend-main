import React, { useEffect, useState } from "react";
import { FormPassword } from "./FormPassword";

export const FormProfile = ({ customerInfo }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("default-avatar.png"); 
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (customerInfo) {
      setName(customerInfo.name || "");
      setPhoneNumber(customerInfo.phoneNumber || "");
      setAddress(customerInfo.address || "");
      setAvatar(customerInfo.avatar || "default-avatar.png");
    }
  }, [customerInfo]);


  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]); // Lưu file avatar
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!name || !phoneNumber || !address) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return; // Ngăn chặn việc gửi dữ liệu nếu thiếu thông tin
    }


    const formData = new FormData();

    formData.append("customerId", customerInfo.customerId);
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Token không tồn tại. Vui lòng đăng nhập lại.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/api/customers/update",
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Dùng response.text() để xử lý phản hồi dạng chuỗi
        const message = await response.text();
        alert(message); 
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // Hiển thị lỗi nếu có
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra.");
    }
  };

  return (
    <div className="account-details-form">
      <div className="row">
        <div className="col-lg-12">
          <div className="single-input-item">
            <label htmlFor="avatar" className="required">
              Avatar
            </label>
            <img
              src={avatar}
              width="150"
              height="120"
              alt={name || "Chưa có tên"}
            />
            <input type="file" id="avatar" onChange={handleFileChange} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-input-item">
            <label htmlFor="first-name" className="required">
              Họ và tên
            </label>
            <input
              type="text"
              id="first-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="single-input-item">
            <label htmlFor="phone-number" className="required">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="single-input-item">
        <label htmlFor="address" className="required">
          Địa chỉ
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="single-input-item">
        <button className="check-btn sqr-btn" onClick={handleSubmit}>Cập nhật tài khoản</button>
      </div>
      <FormPassword customerInfo={customerInfo} />
    </div>
  );
};
