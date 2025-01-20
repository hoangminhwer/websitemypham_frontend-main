import React, { useEffect, useState } from "react";
import ProductDetailsThumb from "../components/ProductDetail/ProductDetailsThumb";
import ProductDetailsContent from "../components/ProductDetail/ProductDetailsContent";
import ProductSpecification from "../components/ProductDetail/ProductSpecification";
import ProductReviewItem from "../components/ProductDetail/ProductReviewItem";
import ProductReviewsForm from "../components/ProductDetail/ProductReviewsForm";
import { useParams } from "react-router-dom";
import "./detailproduct.css";
import { GET_PRODUCT_DETAIL, GET_REVIEW_PRODUCT_SUMMY } from "../service/api";
const ProductDetailsPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewSummary, setReviewSummary] = useState({
    totalReviewers: 0,
    averageRating: 0,
  });
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [pageSize] = useState(3); // Số lượng review trên mỗi trang

  // Hàm fetch sản phẩm từ API
  const fetchProduct = () => {
    fetch(GET_PRODUCT_DETAIL(productID))
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  };

  // Hàm fetch review summary từ API
  const fetchReviewSummary = () => {
    fetch(GET_REVIEW_PRODUCT_SUMMY(productID))
      .then((response) => response.json())
      .then((data) => {
        setReviewSummary(data);
      })
      .catch((error) => {
        console.error("Error fetching review summary:", error);
      });
  };

  useEffect(() => {
    fetchProduct();
    fetchReviewSummary();
  }, [productID]);

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReviews = product?.reviews?.slice(startIndex, endIndex) || [];

  const totalPages = Math.ceil((product?.reviews?.length || 0) / pageSize);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="section-space">
      <div className="container">
        <div className="row product-details">
          <div className="col-lg-6">
            {product.images && product.images.length > 0 ? (
              <ProductDetailsThumb
                images={product.imagemain}
                altText={product.name}
                imageList = {product.images}
              />
            ) : (
              <p>No images available for this product</p>
            )}
          </div>
          <div className="col-lg-6">
            <ProductDetailsContent
              productID={productID}
              brand={product.brand}
              title={product.name}
              stock = {product.stock}
              descriptionLong={product.descriptionLong}
              description={product.description}
              price={`${product.price}`}
              totalReviews={reviewSummary.totalReviewers}
              averageRating={reviewSummary.averageRating}
              imagemain={product.imagemain}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div
              className="nav product-details-nav"
              id="product-details-nav-tab"
              role="tablist"
            >
              <button
                className="nav-link"
                id="specification-tab"
                data-bs-toggle="tab"
                data-bs-target="#specification"
                type="button"
                role="tab"
                aria-controls="specification"
                aria-selected="false"
              >
                Specification
              </button>
              <button
                className="nav-link active"
                id="review-tab"
                data-bs-toggle="tab"
                data-bs-target="#review"
                type="button"
                role="tab"
                aria-controls="review"
                aria-selected="true"
              >
                Review
              </button>
            </div>
            <div className="tab-content" id="product-details-nav-tabContent">
              <ProductSpecification descriptionLong={product.descriptionLong} />
              <div
                className="tab-pane fade show active"
                id="review"
                role="tabpanel"
                aria-labelledby="review-tab"
              >
                {paginatedReviews.length > 0 ? (
                  paginatedReviews.map((review, index) => (
                    <ProductReviewItem
                      key={index}
                      imageSrc={review.avatar}
                      name={review.customerName}
                      designation="Customer"
                      reviewText={review.comment}
                      rating={review.rating}
                    />
                  ))
                ) : (
                  <p>No reviews available for this product</p>
                )}

                <div className="pagination-buttons detail">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      disabled={index === currentPage}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <ProductReviewsForm productID={productID} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
