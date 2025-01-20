import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State để lưu email
  const [password, setPassword] = useState(""); // State để lưu password
  const navigate = useNavigate();

  // Hàm xử lý thay đổi thông tin form đăng nhập
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setEmail(value); // Cập nhật giá trị email
    } else if (id === "password") {
      setPassword(value); // Cập nhật giá trị password
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email không được để trống !");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không đúng định dạng !");
      return false;
    }

    if (!password.trim()) {
      toast.error("Password không được để trống !");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/login/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      // Kiểm tra nếu login thành công
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Lấy token từ phản hồi
        sessionStorage.setItem("jwtToken", token);

        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        const roles = data.roles.map((role) => role.authority);
        
        toast.success("Đăng nhập thành công", { autoClose: 2000 }); 

       
        setTimeout(() => {
          if (roles.includes("ROLE_ADMIN")) {
            window.location.href = "/admin"; // Chuyển hướng tới trang admin
          } else {
            window.location.href = "/"; // Chuyển hướng tới trang chủ
          }
        }, 2000); 

        fetch(`http://localhost:8080/api/customer/me/${username}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem("InfKH", JSON.stringify(data));
          })
          .catch((err) =>
            toast.error("Lỗi khi lấy thông tin !")
            // console.error("Lỗi khi lấy thông tin khách hàng:", err)
          );
      } else {
        toast.error("Đăng nhập thất bại !",response.status);
        // console.error("Login failed:", response.status);
      }
    } catch (error) {
      toast.error("Lỗi đăng nhập !");
      // console.error("Error logging in:", error);
    }
  };

  return (
    <section className="section-space">
      <div className="container">
        <div className="row mb-n8">
          <div className="col-lg-6 mb-8">
            {/*== Start Login Area Wrapper ==*/}
            <div className="my-account-item-wrap">
              <h3 className="title">Login</h3>
              <div className="my-account-form">
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group mb-6">
                    <label htmlFor="username">
                      Email đăng nhập <sup>*</sup>
                    </label>
                    <input
                      type="email"
                      id="username"
                      className="form-control"
                      value={email}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="form-group mb-6">
                    <label htmlFor="password">
                      Password <sup>*</sup>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="form-group d-flex align-items-center mb-14">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  
                  <a className="lost-password" href="/forgot-pasword">
                    Quên mật khẩu?
                  </a>
                  <a className="lost-password" href="/register">
                    Bạn chưa có tài khoản?
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default LoginPage;
