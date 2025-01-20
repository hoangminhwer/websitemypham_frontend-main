import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProfile } from "../components/Account/Components/FormProfile";
import { FormPassword } from "../components/Account/Components/FormPassword";
import OrderDetail from "../components/Account/OrderDetail";
import "./AccountPage.css";
const AccountPage = () => {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kiểm tra session đăng nhập
    const token = sessionStorage.getItem("jwtToken");
    const storedCustomerInfo = sessionStorage.getItem("InfKH");

    if (!token || !storedCustomerInfo) {
      // Nếu không tồn tại token hoặc thông tin người dùng, chuyển hướng về trang đăng nhập
      navigate("/login");
    } else {
      // Nếu có, lấy thông tin người dùng từ sessionStorage
      const parsedCustomerInfo = JSON.parse(storedCustomerInfo);
      setCustomerId(parsedCustomerInfo.customerId);
      setCustomerName(parsedCustomerInfo.customerName);

      // Gọi API chỉ khi customerId đã được set
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
            setCustomerInfo(data);
          } else {
            setError("Lỗi khi lấy thông tin chi tiết khách hàng");
          }
        } catch (error) {
          setError("Lỗi khi kết nối với server");
        }
      };

      const fetchOrders = async (customerId) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/orders/customer/${customerId}`,
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
            setOrders(data);
          } else {
            setError("Lỗi khi lấy đơn hàng");
          }
        } catch (error) {
          setError("Lỗi khi kết nối với server");
        } finally {
          setLoading(false);
        }
      };
      const fetchPayments = async (customerId) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/transactions/customer/${customerId}`,
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
            setPayments(data);
          } else {
            setError("Lỗi khi lấy phương thức thanh toán");
          }
        } catch (error) {
          setError("Lỗi khi kết nối với server");
        }
      };

      if (parsedCustomerInfo.customerId) {
        fetchCustomerDetails(parsedCustomerInfo.customerId);
        fetchOrders(parsedCustomerInfo.customerId);
        fetchPayments(parsedCustomerInfo.customerId);
      }
    }
  }, [navigate, customerId]);

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId); // Cập nhật state khi người dùng click vào đơn hàng
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null); // Quay lại danh sách đơn hàng
  };
  const handleCancelOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      const token = sessionStorage.getItem("jwtToken");

      // Bước 1: Gọi API hủy đơn hàng
      fetch(`http://localhost:8080/api/orders/status/${orderId}`, {
        method: "PUT", // Phương thức PUT để cập nhật trạng thái đơn hàng
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          // Kiểm tra nếu phản hồi là text và xử lý phản hồi từ server
          if (response.ok) {
            const message = await response.text(); // Nhận phản hồi là text
            alert(message); // Hiển thị "Success"

            // Cập nhật trạng thái đơn hàng trong state
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.orderId === orderId
                  ? { ...order, status: "Đã hủy" }
                  : order
              )
            );

            // Bước 2: Gọi API cập nhật trạng thái giao dịch thành "Đã hoàn tiền"
            return fetch(
              `http://localhost:8080/api/transactions/refund/${orderId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            const errorMessage = await response.text(); // Nhận phản hồi lỗi là text
            alert("Lỗi khi hủy đơn hàng: " + errorMessage);
            throw new Error(errorMessage);
          }
        })
        .then(async (response) => {
          // Kiểm tra phản hồi từ API cập nhật giao dịch
          if (response.ok) {
            const message = await response.text();
            alert("Cập nhật giao dịch thành công: " + message);
          } else {
            const errorMessage = await response.text();
            alert("Lỗi khi cập nhật giao dịch: " + errorMessage);
          }
        })
        .catch((error) => {
          alert("Lỗi kết nối với server.");
        });
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("InfKH");
    window.location.href = "/login";
  };

  return (
    <section className="my-account-area section-space pd-6">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div
              className="my-account-tab-menu nav nav-tabs"
              id="nav-tab"
              role="tablist"
            >
              <button
                className="nav-link active"
                id="dashboad-tab"
                data-bs-toggle="tab"
                data-bs-target="#dashboad"
                type="button"
                role="tab"
                aria-controls="dashboad"
                aria-selected="true"
              >
                Tổng quan
              </button>
              <button
                className="nav-link"
                id="orders-tab"
                data-bs-toggle="tab"
                data-bs-target="#orders"
                type="button"
                role="tab"
                aria-controls="orders"
                aria-selected="false"
              >
                Đơn hàng
              </button>

              <button
                className="nav-link"
                id="payment-method-tab"
                data-bs-toggle="tab"
                data-bs-target="#payment-method"
                type="button"
                role="tab"
                aria-controls="payment-method"
                aria-selected="false"
              >
                Phương thức thanh toán
              </button>

              <button
                className="nav-link"
                id="account-info-tab"
                data-bs-toggle="tab"
                data-bs-target="#account-info"
                type="button"
                role="tab"
                aria-controls="account-info"
                aria-selected="false"
              >
                Thông tin tài khoản
              </button>
              <button className="nav-link" onClick={handleLogout} type="button">
                Đăng xuất
              </button>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="dashboad"
                role="tabpanel"
                aria-labelledby="dashboad-tab"
              >
                <div className="myaccount-content">
                  <h3>Trang tổng quan</h3>
                  <div className="welcome">
                    <p>
                      Xin chào, <strong>{customerName}</strong> (Nếu không phải{" "}
                      <strong>{customerName} ! </strong>
                      <a href="" className="logout" onClick={handleLogout}>
                        Logout
                      </a>
                      )
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="orders"
                role="tabpanel"
                aria-labelledby="orders-tab"
              >
                <div className="myaccount-content">
                  {selectedOrderId ? (
                    <OrderDetail
                      orderId={selectedOrderId}
                      onBack={handleBackToOrders}
                    />
                  ) : (
                    <>
                      <h3>Orders</h3>
                      <div className="myaccount-table table-responsive text-center">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th>Mã hóa đơn</th>
                              <th>Ngày đặt</th>
                              <th>Trạng thái</th>
                              <th>Giá tiền</th>
                              <th>Địa chỉ</th>
                              <th>Hành động</th> {/* Thêm cột Hành động */}
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length > 0 ? (
                              orders.map((order) => (
                                <tr key={order.orderId}>
                                  <td>{order.orderId}</td>
                                  <td>
                                    {order.orderDate
                                      ? new Date(
                                          order.orderDate
                                        ).toLocaleString()
                                      : "Không có ngày đặt"}
                                  </td>
                                  <td>{order.status}</td>
                                  <td>
                                    {order.amount
                                      ? order.amount.toLocaleString("vi-VN")
                                      : "Không có thông tin giá"}
                                  </td>
                                  <td>{order.shippingAddress}</td>
                                  <td>
                                    {/* Nút bấm Xem đơn hàng */}
                                    <button
                                      className="btn btn-info btn-sm"
                                      onClick={() =>
                                        handleOrderClick(order.orderId)
                                      }
                                      style={{ marginRight: "10px" }}
                                    >
                                      Xem
                                    </button>

                                    {/* Nút bấm Hủy đơn hàng */}
                                    {order.status === "Đang xử lý" ? (
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleCancelOrder(order.orderId)
                                        }
                                      >
                                        Hủy
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-danger btn-sm"
                                        disabled
                                      >
                                        Hủy
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6">Bạn chưa có đơn hàng nào.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="payment-method"
                role="tabpanel"
                aria-labelledby="payment-method-tab"
              >
                <div className="myaccount-content">
                  <h3>Phương thức thanh toán</h3>
                  <div className="myaccount-table table-responsive text-center">
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th>Mã giao dịch</th>
                          <th>Mã hóa đơn</th>
                          <th>Tên phương thức</th>
                          <th>Trạng thái</th>
                          <th>Ngày thanh toán</th>
                          <th>Ngày hủy thanh toán</th>
                          <th>Giá tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.length > 0 ? (
                          payments.map((payment) => (
                            <tr key={payment.id}>
                              <td>{payment.transactionId}</td>
                              <td>{payment.orderId}</td>
                              <td>{payment.paymentMethod}</td>
                              <td>{payment.status}</td>{" "}
                              <td>
                                {new Date(
                                  payment.transactionDate
                                ).toLocaleString()}
                              </td>
                              <td>
                                {new Date(
                                  payment.transactioncancelDate
                                ).toLocaleString()}
                              </td>
                              <td>
                                {payment.amount.toLocaleString("vi-VN")} VND
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">
                              Bạn chưa có phương thức thanh toán nào.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="account-info"
                role="tabpanel"
                aria-labelledby="account-info-tab"
              >
                <div className="myaccount-content">
                  <h3>Thông tin tài khoản</h3>
                  <FormProfile customerInfo={customerInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
