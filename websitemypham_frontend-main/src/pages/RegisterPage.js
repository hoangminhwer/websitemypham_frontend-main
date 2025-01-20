import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegisterPage = () => {
  const [name, setFullName] = useState(""); // State for full name
  const [email, setEmail] = useState(""); // State for email
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [password, setPassword] = useState(""); // State for password
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setFullName(value); 
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "phoneNumber") {
      setPhoneNumber(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  // Validate form fields before submitting
  const validateForm = () => {
    let formErrors = {};
   
    if (!name.trim()) {
      // formErrors.name = "Full name is required";
      toast.error("Họ và tên không được để trống !")
      return false;
    }

    if (!email.trim()) {
      // formErrors.email = "Email is required";
      toast.error("Email không được để trống !")
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không đúng định dạng !")
      // formErrors.email = "Email format is invalid";
      return false;
    }

    if (!phoneNumber.trim()) {
      toast.error("Số điện thoại không được để trống !")
      return false;
    }

    if (!password.trim()) {
      // formErrors.password = "Password is required";
      toast.error("Password không được để trống !")
      return false;
    } else if (password.length < 6) {
      // formErrors.password = "Password must be at least 6 characters";
      toast.error("Password tối thiểu 6 kí tự !")
      return false;
    }

    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      // Fetch the next customerId
      const customerIdResponse = await fetch(
        "http://localhost:8080/api/customers/nextCustomerId"
      );
      const customerId = await customerIdResponse.text();

      const registerData = {
        customerId,
        name,
        email,
        phoneNumber,
        password,
        address: "",
        orderHistory: [],
        avatar: "",
        role : "CUSTOMER"
      };
      console.log(registerData);
      const response = await fetch("http://localhost:8080/api/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const message = await response.text(); 
        console.log("Registration successful:", message);
        alert(message); 
        navigate("/login");
      } else {
        const errorMessage = await response.text(); 
        console.error("Registration failed:", errorMessage);
        alert(errorMessage); 
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <section className="section-space">
      <div className="container">
        <div className="row mb-n8">
          <div className="col-lg-6 mb-8">
            <div className="my-account-item-wrap">
              <h3 className="title">Register</h3>
              <div className="my-account-form">
                <form onSubmit={handleRegisterSubmit}>
                  <div className="form-group mb-6">
                    <label htmlFor="name">
                      Họ và tên <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={handleRegisterChange}
                    />
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label htmlFor="email">
                      Email<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={handleRegisterChange}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label htmlFor="phoneNumber">
                      Số điện thoại <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-control"
                      value={phoneNumber}
                      onChange={handleRegisterChange}
                    />
                    {errors.phoneNumber && (
                      <span className="error">{errors.phoneNumber}</span>
                    )}
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
                      onChange={handleRegisterChange}
                    />
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>

                  <div className="form-group d-flex align-items-center mb-14">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
