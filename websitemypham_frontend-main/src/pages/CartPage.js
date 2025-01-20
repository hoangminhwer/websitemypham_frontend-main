import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cartpage.css";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  // Lấy dữ liệu từ sessionStorage
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      setCartItems(parsedCart);

      // Tính tổng giá trị giỏ hàng
      const totalPrice = parsedCart.reduce(
        (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
        0
      );
      setTotal(totalPrice);
      sessionStorage.removeItem("orders");
    }
  }, []);

  const handleIncreaseQuantity = (productID) => {
    const updatedCart = cartItems.map((item) =>
      item.productID === productID
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
      0
    );
    setTotal(updatedTotal);
  };

  // Hàm giảm số lượng sản phẩm
  const handleDecreaseQuantity = (productID) => {
    const updatedCart = cartItems.map((item) =>
      item.productID === productID && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
      0
    );
    setTotal(updatedTotal);
  };

  const handleSelectItem = (productID) => {
    // Cập nhật danh sách các sản phẩm đã chọn
    const updatedSelectedItems = selectedItems.includes(productID)
      ? selectedItems.filter((id) => id !== productID)
      : [...selectedItems, productID];

    setSelectedItems(updatedSelectedItems);

    // Lưu các sản phẩm đã chọn vào sessionStorage
    const selectedProducts = cartItems.filter((item) =>
      updatedSelectedItems.includes(item.productID)
    );
    sessionStorage.setItem("orders", JSON.stringify(selectedProducts));
  };
  // Hàm xử lý khi nhấn nút thanh toán
  const handleCheckout = () => {
    const authToken = sessionStorage.getItem("jwtToken");

    if (!authToken) {
      toast.error("Bạn cần đăng nhập trước khi thanh toán!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/login"; // Chuyển hướng sử dụng window.location.href
      }, 2000);
      return;
    }

    const storedOrders = sessionStorage.getItem("orders");

    if (!storedOrders || JSON.parse(storedOrders).length === 0) {
      toast.error("Bạn chưa chọn sản phẩm nào trong giỏ hàng!", {
        autoClose: 2000,
      });
      return;
    }
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.productID)
    );
    sessionStorage.setItem("orders", JSON.stringify(selectedProducts));
    navigate("/checkout");
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (productID) => {
    const updatedCart = cartItems.filter(
      (item) => item.productID !== productID
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật tổng giá trị sau khi xóa sản phẩm
    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
      0
    );
    setTotal(updatedTotal);
    window.location.reload();
  };

  return (
    <section className="section-space">
      <div className="container">
        <div className="shopping-cart-form table-responsive">
          <form action="#" method="post">
            <table className="table text-center">
              <thead>
                <tr>
                  <th className="product-select">&nbsp;</th>
                  <th className="product-remove">&nbsp;</th>
                  <th className="product-thumbnail">&nbsp;</th>
                  <th className="product-name">Product</th>
                  <th className="product-price">Price</th>
                  <th className="product-quantity">Quantity</th>
                  <th className="product-subtotal">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr className="tbody-item" key={item.productID}>
                      <td className="product-select">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.productID)}
                          onChange={() => handleSelectItem(item.productID)}
                        />
                      </td>
                      <td className="product-remove">
                        <a
                          className="remove"
                          href="javascript:void(0)"
                          onClick={() => handleRemove(item.productID)}
                        >
                          ×
                        </a>
                      </td>
                      <td className="product-thumbnail">
                        <div className="thumb">
                          <a href="single-product.html">
                            <img
                              src={item.images}
                              width="68"
                              height="84"
                              alt={item.title}
                            />
                          </a>
                        </div>
                      </td>
                      <td className="product-name">
                        <a className="title" href="single-product.html">
                          {item.title}
                        </a>
                      </td>
                      <td className="product-price">
                        <span className="price">
                          {parseFloat(item.price).toLocaleString("vi-VN")} VND
                        </span>
                      </td>
                      <td className="product-quantity">
                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              handleDecreaseQuantity(item.productID)
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="quantity cart-page"
                            title="Quantity"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleIncreaseQuantity(item.productID)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span className="price">
                          {(
                            parseFloat(item.price) * parseFloat(item.quantity)
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No products in cart</td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6"></div>
          <div className="col-12 col-lg-6">
            <div className="cart-totals-wrap">
              <h2 className="title">Cart totals</h2>
              <table>
                <tbody>
                  <tr className="order-total">
                    <th>Total</th>
                    <td>
                      <span className="amount">
                        {total.toLocaleString("vi-VN")} VND
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-end">
                <button className="checkout-button" onClick={handleCheckout}>
                  Thanh Toán Sản Phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CartPage;
