import React, { useEffect, useState } from "react";
import "./ProfileFormPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileFormPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); // Khởi tạo avatar state riêng
  const [error, setError] = useState(null);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    const storedCustomerInfo = sessionStorage.getItem("InfKH");

    if (!token || !storedCustomerInfo) {
      navigate("/login");
    } else {
      const parsedCustomerInfo = JSON.parse(storedCustomerInfo);
      const customerId = parsedCustomerInfo.customerId;

      const fetchCustomerDetails = async (customerId) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/customers/customerId/${customerId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phoneNumber);
            setAddress(data.address);
            setAvatar(data.avatar); // Cập nhật avatar từ API
          } else {
            setError("Lỗi khi lấy thông tin chi tiết khách hàng");
          }
        } catch (error) {
          setError("Lỗi khi kết nối với server");
        }
      };

      fetchCustomerDetails(customerId);
    }
  }, [navigate]);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = () => {
    if (!passwordData.oldPassword.trim()) {
      toast.error("Mật khẩu cũ không được để trống!");
      return;
    }
    if (!passwordData.newPassword.trim()) {
      toast.error("Mật khẩu mới không được để trống!");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp mật khẩu mới!");
      return;
    }

    // Xử lý đổi mật khẩu
    toast.success("Cập nhật mật khẩu thành công!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setAvatar(upload.target.result); // Cập nhật avatar trong state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Họ và tên không được để trống!");
      return;
    }
    if (!email.trim()) {
      toast.error("Email không được để trống!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không đúng định dạng!");
      return;
    }
    if (!phone.trim()) {
      toast.error("Số điện thoại không được để trống!");
      return;
    }
    if (!/^\d+$/.test(phone)) {
      toast.error("Số điện thoại chỉ được chứa các chữ số!");
      return;
    }
    if (!address.trim()) {
      toast.error("Địa chỉ không được để trống!");
      return;
    }

    // Xử lý logic lưu trữ ở đây
    toast.success("Cập nhật thông tin thành công!");
  };

  if (!name || !email) {
    return <div>Loading...</div>; // Hiển thị Loading trong khi dữ liệu đang được tải
  }

  return (
    <div className="profile-form-container">
      <div className="profile-header">
        <img
          className="profile-image"
          src={avatar || "https://via.placeholder.com/150"} // Sử dụng ảnh placeholder nếu avatar không có
          alt="Profile"
        />
        <div className="profile-info">
          <label className="upload-photo-label" htmlFor="upload-photo">
            Update Photo
          </label>
          <input
            type="file"
            id="upload-photo"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <form className="profile-form">
        <div className="form-row">
          <div className="form-group profile">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group profile">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group profile">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group profile">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="form-footer mb-3">
          <button type="button" className="btn-save" onClick={handleSave}>
            Lưu thông tin
          </button>
        </div>

        <div className="password-section">
          <div className="form-row">
            <div className="form-group profile full-width">
              <label>Mật Khẩu Cũ</label>
              <input
                type="password"
                name="oldPassword"
                autoComplete="new-password"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group profile">
              <label>Mật Khẩu Mới</label>
              <input
                type="password"
                name="newPassword"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group profile">
              <label>Nhập Lại Mật Khẩu Mới</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn-save"
            onClick={handlePasswordUpdate}
          >
            Lưu mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileFormPage;
