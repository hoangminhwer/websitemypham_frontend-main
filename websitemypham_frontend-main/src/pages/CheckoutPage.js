import React, { useEffect, useState } from "react";
import vietnamAddressData from "../util/vietnamAddress.json"; // Correct the import path to the JSON file
import "./checkout.css";
const CheckoutPage = () => {
  const [provinces, setProvinces] = useState([]); // Dữ liệu tỉnh/thành
  const [districts, setDistricts] = useState([]); // Dữ liệu quận/huyện
  const [wards, setWards] = useState([]); // Dữ liệu phường/xã

  const [street, setStreet] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(""); // Tỉnh được chọn
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Quận được chọn
  const [selectedWard, setSelectedWard] = useState(""); // Phường được chọn

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  // Fetch cart items from sessionStorage or localStorage
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("orders")) || [];
    setCartItems(storedCart);
    console.log(cartItems);
    // Calculate the total amount
    const total = storedCart.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
      0
    );
    setTotalAmount(total);
  }, []);

  // Load dữ liệu tỉnh từ file JSON khi component mount
  useEffect(() => {
    setProvinces(vietnamAddressData);
  }, []);

  // Khi tỉnh thay đổi, load quận tương ứng
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    // Lọc danh sách quận dựa trên tỉnh được chọn
    const selectedProvinceData = vietnamAddressData.find(
      (p) => p.Id === provinceId
    );
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.Districts);
      setWards([]); // Reset danh sách phường khi tỉnh thay đổi
      setSelectedDistrict(""); // Reset selected district
    }
  };

  // Khi quận thay đổi, load phường tương ứng
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    // Lọc danh sách phường dựa trên quận được chọn
    const selectedDistrictData = districts.find((d) => d.Id === districtId);
    if (selectedDistrictData) {
      setWards(selectedDistrictData.Wards);
      setSelectedWard(""); // Reset selected ward
    }
  };

  // Hàm kiểm tra số điện thoại hợp lệ (10-11 chữ số)
  const validatePhoneNumber = (phone) => /^\d{10,11}$/.test(phone);

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  // Hàm kiểm tra dữ liệu form
  const validateForm = () => {
    let formErrors = {};
    if (!fullName) formErrors.fullName = "Vui lòng nhập họ và tên.";
    if (!street) formErrors.street = "Vui lòng nhập địa chỉ đường.";
    if (!selectedProvince) formErrors.province = "Vui lòng chọn tỉnh.";
    if (!selectedDistrict) formErrors.district = "Vui lòng chọn quận/huyện.";
    if (!selectedWard) formErrors.ward = "Vui lòng chọn phường/xã.";
    if (!phone) {
      formErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!validatePhoneNumber(phone)) {
      formErrors.phone = "Số điện thoại không hợp lệ.";
    }
    if (!email) {
      formErrors.email = "Vui lòng nhập địa chỉ email.";
    } else if (!validateEmail(email)) {
      formErrors.email = "Email không hợp lệ.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }
    if (!selectedPaymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    // Tìm tên tỉnh từ Id
    const selectedProvinceName = provinces.find(
      (province) => province.Id === selectedProvince
    )?.Name;

    // Tìm tên quận từ Id
    const selectedDistrictName = districts.find(
      (district) => district.Id === selectedDistrict
    )?.Name;

    // Tìm tên phường từ Id
    const selectedWardName = wards.find(
      (ward) => ward.Id === selectedWard
    )?.Name;

    const orderDetails = {
      fullName,
      email,
      phone,
      totalAmount,
      paymentMethod: selectedPaymentMethod,
      selectedProvince: selectedProvinceName,
      selectedDistrict: selectedDistrictName,
      selectedWard: selectedWardName,
      street,
    };

    sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    if (selectedPaymentMethod === "VNPay") {
      handleVNPayPayment();
    } else if (selectedPaymentMethod === "Momo") {
      handleMomoPayment();
    }
  };

  // Gọi API thanh toán VNPay
  const handleVNPayPayment = async () => {
    const token = sessionStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/payment/vnpay/vn-pay?amount=${totalAmount}&bankCode=NCB`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.code === "ok" && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Có lỗi xảy ra trong quá trình thanh toán.");
      }
    } catch (error) {
      console.error("Error during VNPay payment", error);
      alert("Có lỗi xảy ra trong quá trình thanh toán.");
    }
  };

  const handleMomoPayment = () => {
    // Handle Momo payment flow
    alert("Momo payment selected, implement Momo payment logic here.");
  };

  return (
    <section className="shopping-checkout-wrap section-space">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/*== Start Billing Accordion ==*/}
            <div className="checkout-billing-details-wrap">
              <h2 className="title">Chi tiết thanh toán</h2>
              <div className="billing-form-wrap">
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="f_name">
                          Họ và tên{" "}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          id="f_name"
                          type="text"
                          className="form-control"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.fullName && (
                          <p className="error-text">{errors.fullName}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="street-address">
                          Đường{" "}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          id="street-address"
                          type="text"
                          className="form-control"
                          placeholder="House number and street name"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                        {errors.street && (
                          <p className="error-text">{errors.street}</p>
                        )}
                      </div>
                    </div>
                    {/* Tỉnh Thành */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="province">
                          Tỉnh Thành <abbr className="required">*</abbr>
                        </label>
                        <select
                          id="province"
                          className="form-control"
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                        >
                          <option value="">Chọn Tỉnh Thành</option>
                          {provinces.map((province) => (
                            <option key={province.Id} value={province.Id}>
                              {province.Name}
                            </option>
                          ))}
                        </select>
                        {errors.province && (
                          <p className="error-text">{errors.province}</p>
                        )}
                      </div>
                    </div>

                    {/* Quận Huyện */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="district">
                          Quận Huyện <abbr className="required">*</abbr>
                        </label>
                        <select
                          id="district"
                          className="form-control"
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          disabled={!selectedProvince} // Vô hiệu hóa nếu chưa chọn tỉnh
                        >
                          <option value="">Chọn Quận Huyện</option>
                          {districts.map((district) => (
                            <option key={district.Id} value={district.Id}>
                              {district.Name}
                            </option>
                          ))}
                        </select>
                        {errors.district && (
                          <p className="error-text">{errors.district}</p>
                        )}
                      </div>
                    </div>

                    {/* Phường Xã */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="ward">
                          Phường Xã <abbr className="required">*</abbr>
                        </label>
                        <select
                          id="ward"
                          className="form-control"
                          value={selectedWard}
                          onChange={(e) => setSelectedWard(e.target.value)}
                          disabled={!selectedDistrict}
                        >
                          <option value="">Chọn Phường Xã</option>
                          {wards.map((ward) => (
                            <option key={ward.Id} value={ward.Id}>
                              {ward.Name}
                            </option>
                          ))}
                        </select>
                        {errors.ward && (
                          <p className="error-text">{errors.ward}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="phone">Phone (optional)</label>
                        <input
                          id="phone"
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && (
                          <p className="error-text">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="email">
                          Email address{" "}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          id="email"
                          type="text"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <p className="error-text">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-0">
                        <label htmlFor="order-notes">Ghi chú</label>
                        <textarea
                          id="order-notes"
                          className="form-control"
                          placeholder="Ghi chú về đơn hàng, ví dụ: yêu cầu đặc biệt cho giao hàng."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="checkout-order-details-wrap">
              <div className="order-details-table-wrap table-responsive">
                <h2 className="title mb-25">Đơn hàng của bạn</h2>
                <table className="table1">
                  <thead>
                    <tr>
                      <th className="product-name">Product</th>
                      <th className="product-total">Total</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr className="cart-item" key={item.productId}>
                          <td className="product-name">
                            {item.name}{" "}
                            <span className="product-quantity">
                              × {item.quantity}
                            </span>
                          </td>
                          <td className="product-total">
                            {(
                              parseFloat(item.price) * parseFloat(item.quantity)
                            ).toLocaleString("vi-VN")}{" "}
                            VND
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Your cart is empty</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="table-foot">
                    <tr className="order-total">
                      <th className="total-label">Total Amount</th>
                      <td className="total-amount">
                        {parseFloat(totalAmount).toLocaleString("vi-VN")} VND
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="shop-payment-method">
                  <div id="PaymentMethodAccordion">
                    <div className="card">
                      {/* <div className="card-header" id="check_payments2">
                        <h5
                          className="title"
                          data-bs-toggle="collapse"
                          data-bs-target="#itemTwo"
                          aria-controls="itemTwo"
                          aria-expanded={selectedPaymentMethod === "Momo"}
                          onClick={() => setSelectedPaymentMethod("Momo")}
                        >
                          Thanh toán Momo
                        </h5>
                      </div> */}
                      <div
                        id="itemTwo"
                        className="collapse"
                        aria-labelledby="check_payments2"
                        data-bs-parent="#PaymentMethodAccordion"
                      >
                        <div className="card-body">
                          {/* Momo payment info */}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="check_payments4">
                        <h5
                          className="title"
                          data-bs-toggle="collapse"
                          data-bs-target="#itemFour"
                          aria-controls="itemFour"
                          aria-expanded={selectedPaymentMethod === "VNPay"}
                          onClick={() => setSelectedPaymentMethod("VNPay")}
                        >
                          Thanh toán VN Pay
                        </h5>
                      </div>
                      <div
                        id="itemFour"
                        className="collapse"
                        aria-labelledby="check_payments4"
                        data-bs-parent="#PaymentMethodAccordion"
                      >
                        <div className="card-body">
                          {/* VNPay payment info */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="agree-policy">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="custom-control-input visually-hidden"
                      />
                      <label htmlFor="privacy" className="custom-control-label">
                        Tôi đã đọc và đồng ý với các điều khoản và điều kiện{" "}
                        <span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-place-order"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
            {/*== End Order Details Accordion ==*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
