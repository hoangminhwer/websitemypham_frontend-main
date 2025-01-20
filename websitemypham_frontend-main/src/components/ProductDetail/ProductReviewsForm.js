import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { POST_REVIEW_PRODUCT_DETAIL } from "../../service/api";
const ProductReviewsForm = ({ productID }) => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [rating, setRating] = useState(5); // State lưu mức đánh giá
  const [comment, setComment] = useState(""); // State lưu phản hồi
  const [fullName, setFullName] = useState(""); // State lưu tên người dùng
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // State cho checkbox xác nhận
  const [errors, setErrors] = useState({}); // Để lưu lỗi
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const storedCustomerInfo = sessionStorage.getItem("InfKH");
    if (storedCustomerInfo) {
      const parsedCustomerInfo = JSON.parse(storedCustomerInfo);
      setCustomerInfo(parsedCustomerInfo);
      setCustomerId(parsedCustomerInfo.customerId);
      setCustomerName(parsedCustomerInfo.customerName);
      setAvatar(parsedCustomerInfo.avatar);
    }
  }, []);

  React.useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true); // Nếu có token, người dùng đã đăng nhập
    }
  }, []);

  // Xử lý khi người dùng gửi đánh giá
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để gửi đánh giá.");
      navigate("/login");
      return;
    }

    const newErrors = {};
    if (!fullName.trim()) {
      toast.error("Họ và tên không được để trống.");
      return ;
    }
    if (!comment.trim()) {
      toast.error("Feedback không được để trống.");
      return ;
    }
    if (!isConfirmed) {
      toast.warn("Bạn phải xác nhận trước khi gửi.");
      return ;
    }

    // Nếu có lỗi, không cho phép submit form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    

    const currentDate = new Date().toISOString();
    const reviewData = {
      customerId,
      customerName,
      rating,
      comment,
      avatar,
      reviewDate: currentDate,
      updateDate: currentDate,
    };

    const token = sessionStorage.getItem("jwtToken");
    fetch(POST_REVIEW_PRODUCT_DETAIL(productID), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.text())
      .then((data) => {
        // console.log("Đánh giá đã được gửi:", data);
        toast.success("Đánh giá thành công !");
      })
      .catch((error) => {
        toast.success("Lỗi khi gửi đánh giá !");
        // console.error("Lỗi khi gửi đánh giá:", error);
      });
  };

  return (
    <div className="product-reviews-form-wrap">
      <h4 className="product-form-title">Đánh giá của bạn</h4>
      <div className="product-reviews-form">
        <form onSubmit={handleSubmit}>
          <div className="form-input-item">
            <input
              className="form-control"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
          <div className="form-input-item">
            <textarea
              className="form-control"
              placeholder="Enter your feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            {errors.comment && <p className="error">{errors.comment}</p>}
          </div>
          <div className="form-input-item">
            <div className="form-ratings-item">
              <select
                id="product-review-form-rating-select"
                className="select-ratings"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
              </select>
              <span className="title">Mức đánh giá</span>
            </div>
            <div className="reviews-form-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                id="ReviewsFormCheckbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
              />
              <label className="form-check-label" htmlFor="ReviewsFormCheckbox">
                Xác nhận đánh giá
              </label>
              {errors.isConfirmed && (
                <p className="error">{errors.isConfirmed}</p>
              )}
            </div>
          </div>
          <div className="form-input-item mb-0">
            <button type="submit" className="btn-submit-review">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReviewsForm;
