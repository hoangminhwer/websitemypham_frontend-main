import React from 'react';
import ProductItemShop from './ProductItemShop';
import "./shoplist.css";

const ProductList = ({ products }) => {
  return (
    <div className="row g-3 g-sm-6 section-shop-page">
      {products.map((product, index) => {
        // Tính tổng số sao
        const totalRating = product.reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );

        return (
          <ProductItemShop
            key={index}
            id={product.productId}
            imgSrc={product.imagemain} // Giả sử images là một mảng
            imgAlt={product.name}
            title={product.name}
            price={product.price}
            oldPrice={product.cost} // Nếu có giá cũ
            reviews={product.reviews.length} // Số lượng đánh giá
            totalRating={totalRating} // Truyền tổng số sao
          />
        );
      })}
    </div>
  );
};

export default ProductList;
