import React, { useEffect, useState } from "react";
import ProductCategoryItem from "../components/Home/ProductCategoryItem";
import ProductItem from "../components/Home/ProductItem";
import { GUEST_GET_PRODUCT_TOP6 } from "../service/api";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
    }
  }, []);

  useEffect(() => {
    fetch(GUEST_GET_PRODUCT_TOP6)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching top 6 products:", error);
      });
  }, []);

  return (
    <div>
      {/*== Start Product Category Area Wrapper ==*/}
      <section className="section-space pb-0 section-home-category">
        <div className="container">
          <div className="row g-3 g-sm-6">
            <ProductCategoryItem
              imgSrc="assets/images/shop/category/1.webp"
              title="Hare care"
              bgColor=""
            />
            <ProductCategoryItem
              imgSrc="assets/images/shop/category/2.webp"
              title="Skin care"
              bgColor="#FFEDB4"
            />
            <ProductCategoryItem
              imgSrc="assets/images/shop/category/3.webp"
              title="Hare care"
              bgColor="#FFF3DA"
            />
            <ProductCategoryItem
              imgSrc="assets/images/shop/category/4.webp"
              title="Skin care"
              bgColor="#FFEDB4"
            />
            <ProductCategoryItem
              imgSrc="assets/images/shop/category/5.webp"
              title="Hare care"
              bgColor="#DFE4FF"
            />
            <ProductCategoryItem
              imgSrc="assets/images/shop/category/6.webp"
              title="Skin care"
              bgColor="#FFDAE0"
            />
          </div>
        </div>
      </section>

      <section className="section-space pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-title text-center"
                style={{ marginBottom: "70px" }}
              >
                <h2 className="title">Top Selling</h2>
                <p>Các sản phẩm bán được chạy nhất của cửa hàng</p>
              </div>
            </div>
          </div>
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6 pb-5">
            {products.map((product) => {
              // Tính tổng số sao đánh giá cho sản phẩm
              const totalRating = product.reviews.reduce(
                (acc, review) => acc + review.rating,
                0
              );

              return (
                <ProductItem
                  key={product.productId}
                  productId={product.productId}
                  imgSrc={product.imagemain}
                  title={product.name}
                  price={product.price}
                  oldPrice={product.cost} // Có thể thêm oldPrice nếu cần
                  reviews={product.reviews.length}
                  totalRating={totalRating} // Tổng số sao đánh giá
                />
              );
            })}
          </div>
        </div>
      </section>
      {/*== End Product Area Wrapper ==*/}
    </div>
  );
};

export default HomePage;
