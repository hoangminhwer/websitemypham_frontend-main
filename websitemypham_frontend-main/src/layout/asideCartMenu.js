import React, { useEffect, useState } from 'react';

const AsideCartMenu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Lấy dữ liệu giỏ hàng từ sessionStorage
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);

      // Tính tổng giá trị giỏ hàng
      const total = parsedCart.reduce(
        (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
        0
      );
      setSubtotal(total);
    }
  }, []);

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (productID) => {
    const updatedCart = cartItems.filter((item) => item.productID !== productID);
    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));

    // Cập nhật tổng giá trị sau khi xóa sản phẩm
    const updatedTotal = updatedCart.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseFloat(item.quantity),
      0
    );
    setSubtotal(updatedTotal);
    window.location.reload();
  };

  return (
    <aside
      className="aside-cart-wrapper offcanvas offcanvas-end"
      tabIndex="-1"
      id="AsideOffcanvasCart"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h1 className="d-none" id="offcanvasRightLabel">Shopping Cart</h1>
        <button
          className="btn-aside-cart-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          Shopping Cart <i className="fa fa-chevron-right"></i>
        </button>
      </div>
      <div className="offcanvas-body">
        <ul className="aside-cart-product-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li className="aside-product-list-item" key={item.productID}>
                <a
                  href="#/"
                  className="remove"
                  onClick={() => handleRemove(item.productID)}
                >
                  ×
                </a>
                <a href="product-details-normal.html">
                  <img
                    src={item.images}
                    width="68"
                    height="84"
                    alt="Product Image"
                  />
                  <span className="product-title">{item.title}</span>
                </a>
                <span className="product-price">
                  {item.quantity} × {parseFloat(item.price).toLocaleString('vi-VN')} VND
                </span>
              </li>
            ))
          ) : (
            <p>No products in cart</p>
          )}
        </ul>
        <p className="cart-total">
          <span>Total:</span>
          <span className="amount">{subtotal.toLocaleString('vi-VN')} VND</span>
        </p>
        <a className="btn-total" href="/cart">View cart</a>
        {/* <a className="btn-total" href="/checkout">Checkout</a> */}
      </div>
    </aside>
  );
};

export default AsideCartMenu;
