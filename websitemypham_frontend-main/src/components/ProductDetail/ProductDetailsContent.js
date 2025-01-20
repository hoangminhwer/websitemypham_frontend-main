import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  './Button.css'; 
const ProductDetailsContent = ({
  productID,
  brand,
  title,
  stock,
  description,
  price,
  totalReviews,
  averageRating,
  imagemain,
}) => {
  const [quantity, setQuantity] = useState(1); // State để lưu số lượng sản phẩm

  // Hàm để tăng số lượng sản phẩm
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Hàm để giảm số lượng sản phẩm
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Hàm để thêm sản phẩm vào sessionStorage giỏ hàng
  const handleAddToCart = () => {

    if(stock <= 0){
      toast.error("Sản phẩm đã hết hàng");
      return;
    }
    if(stock < quantity){
      toast.error("Không đủ sản phẩm cho đơn hàng của bạn !");
      return;
    }

    const productData = {
      productID: productID,
      title: title,
      price: price,
      quantity: quantity,
      images: imagemain,
    };

    // Lấy giỏ hàng hiện tại từ sessionStorage
    let cart = sessionStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(
      (item) => item.productID === productID
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, cộng thêm số lượng
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
      cart.push(productData);
    }

    // Lưu lại giỏ hàng vào sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // alert("Sản phẩm đã được thêm vào giỏ hàng!");
    toast.success("Sản phẩm đã được thêm vào giỏ hàng !");
    setTimeout(function() {
        window.location.reload();
    }, 2000); // 2000 mili giây = 2 giây
    
  };

  return (
    <div className="product-details-content">
      <h5 className="product-details-collection">{brand}</h5>
      <h3 className="product-details-title">{title}</h3>
      <div className="product-details-review mb-7">
        <div className="product-review-icon">
          {Array.from({ length: 5 }, (_, index) => (
            <i
              key={index}
              className={index < averageRating ? "fa fa-star" : "fa fa-star-o"}
            ></i>
          ))}
        </div>
        <button type="button" className="product-review-show">
          {totalReviews} reviews
        </button>
      </div>
      <p>Số lượng còn lại : {stock}</p>

      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      <div className="product-details-pro-qty">
        <div className="pro-qty">
          <button
            type="button"
            className="up-cart-btn button2"
            onClick={handleDecrease}
          >
            -
          </button>
          <input
            type="text"
            className="value-quantity-cart"
            title="Quantity"
            value={quantity}
            readOnly
          />

          <button
            type="button"
            className="down-cart-btn button2"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      <div className="product-details-action">
        <h4 className="price">{price}</h4>
        <div className="product-details-cart-wishlist">
        <button type="button" className="custom-btn1 btn-1" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContent;
