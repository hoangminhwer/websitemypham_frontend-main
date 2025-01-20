import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css"; // Import file CSS riêng
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const [password, setPassword] = useState("");
  const query = useQuery();
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu !");
      return;
    }
    try {
      await axios.post("http://localhost:8080/reset-password", {
        token,
        password,
      });
      toast.success("Cập nhật mật khẩu mới thành công !");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2500);
    } catch (error) {
      toast.error("Lỗi cập nhật không thành công !");
    }
  };

  return (
    <div className="reset-password-container">
      
      <form className="reset-password-form reset" onSubmit={handleSubmit}>
        <input
          type="password"
          className="password-input reset"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
        />
        <button className="submit-button reset" type="submit">
          Xác nhận mật khẩu
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
