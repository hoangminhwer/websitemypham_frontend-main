import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập Email !");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không đúng định dạng !");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/forgot-password", { email });
      toast.success("Mật khẩu reset đã được gửi tới Email của bạn !");
    } catch (error) {
      toast.error("Xảy ra lỗi ! Vui lòng thử lại sau !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="forgot-password-form forgot" onSubmit={handleSubmit}>
      <input
        type="email"
        className="email-input forgot"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập Email của bạn"
        disabled={loading}
      />

      <button className="submit-button forgot" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Reset Password"}
      </button>
      <ToastContainer />
    </form>
  );
}

export default ForgotPassword;
