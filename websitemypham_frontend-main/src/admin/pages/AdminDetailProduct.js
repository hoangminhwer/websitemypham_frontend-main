import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "../components/Product/DetailProductPage.css"
import axios from "axios";
import ProductRow from "../components/Product/ProductRow";
import "../components/Product/Review.css"



const AdminDetailProduct = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product,setProduct] = useState({});
    const { id } = useParams();
    const token = sessionStorage.getItem("jwtToken");
    const jwt = token;
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    useEffect(() => {
        const fetchData = async () => {


            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`)
                // console.log("API Response:", response.data);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching data:", err.message);
                if (err.response) {
                    console.error("Response data:", err.response.data);
                    console.error("Response status:", err.response.status);
                } else {
                    console.error("Error without response");
                }
                setError(err.message || "An error occurred while fetching data");
            }

        };

        fetchData();
    }, [id, jwt]);
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    }
    const totalComments = product.reviews ? product.reviews.length : 0;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = product.reviews ? product.reviews.slice(indexOfFirstComment, indexOfLastComment) : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const carousel = document.querySelector('.carousel');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        const slides = document.querySelectorAll('.carousel img');
        const totalImages = slides.length;
        let currentIndex = 0;

        function updateCarousel() {
            const offset = currentIndex * (slides[0].offsetWidth); 
            carousel.style.transform = `translateX(-${offset}px)`;
        }

        if (prevBtn && nextBtn && totalImages > 0) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex === 0) {
                    // Quay về ảnh cuối cùng
                    currentIndex = totalImages - 1;
                } else {
                    currentIndex--;
                }
                updateCarousel();
            });

            nextBtn.addEventListener('click', () => {
                if (currentIndex === totalImages - 1) {
                    // Quay lại ảnh đầu tiên
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                updateCarousel();
            });
        }

        return () => {
            if (prevBtn) prevBtn.removeEventListener('click', updateCarousel);
            if (nextBtn) nextBtn.removeEventListener('click', updateCarousel);
        };
    }, [product.images]);


    return (
        <section className="product-briefing flex card vX9SYw"><h1 className="Bf9ap6">Apple iPhone 15 Pro Max 256GB
            Chính hãng VN/A</h1>
            <div style={{display: 'flex'}}>
                <section style={{flex: 1, padding: '10px', border: '1px solid #ccc', marginRight: '10px'}}
                         className="TFDXyQ"><h2 className="Bf9ap6">Product Image Section</h2>
                    <div className="flex flex-column">
                        <div className="TMw1ot">
                            <div className="xxW0BG">
                                <div className="HJ5l1F" style={{display: 'none'}}>
                                    <div className="shopee-image-placeholder CCU0Uo">
                                        <svg enable-background="new 0 0 54 61" viewBox="0 0 54 61" role="img"
                                             className="stardust-icon stardust-icon-shopee icon-shopee-tiny">
                                            <path stroke="none"
                                                  d="M35.67,44.95 C35.34,47.70 33.67,49.91 31.09,51.01 C29.65,51.63 27.72,51.96 26.19,51.85 C23.81,51.76 21.57,51.18 19.50,50.12 C18.77,49.74 17.67,48.99 16.82,48.28 C16.61,48.10 16.58,47.99 16.73,47.78 C16.80,47.67 16.94,47.46 17.25,47.01 C17.71,46.34 17.76,46.26 17.81,46.18 C17.96,45.96 18.19,45.94 18.42,46.12 C18.45,46.14 18.45,46.14 18.47,46.16 C18.50,46.19 18.50,46.19 18.59,46.26 C18.68,46.33 18.74,46.37 18.76,46.39 C20.99,48.13 23.58,49.13 26.20,49.24 C29.84,49.19 32.46,47.55 32.93,45.03 C33.44,42.27 31.27,39.88 27.02,38.54 C25.69,38.13 22.33,36.78 21.71,36.42 C18.80,34.71 17.44,32.47 17.64,29.71 C17.93,25.88 21.49,23.03 25.98,23.01 C27.98,23.01 29.99,23.42 31.91,24.23 C32.60,24.52 33.81,25.18 34.23,25.50 C34.47,25.68 34.52,25.88 34.38,26.11 C34.31,26.24 34.18,26.44 33.91,26.87 L33.91,26.87 C33.55,27.44 33.54,27.46 33.46,27.59 C33.32,27.80 33.15,27.82 32.90,27.66 C30.84,26.28 28.55,25.58 26.04,25.53 C22.91,25.59 20.57,27.45 20.42,29.99 C20.38,32.28 22.09,33.95 25.80,35.22 C33.33,37.64 36.21,40.48 35.67,44.95 M26.37,5.43 C31.27,5.43 35.27,10.08 35.46,15.90 L17.29,15.90 C17.47,10.08 21.47,5.43 26.37,5.43 M51.74,17.00 C51.74,16.39 51.26,15.90 50.66,15.90 L50.64,15.90 L38.88,15.90 C38.59,8.21 33.10,2.08 26.37,2.08 C19.64,2.08 14.16,8.21 13.87,15.90 L2.07,15.90 C1.48,15.91 1.01,16.40 1.01,17.00 C1.01,17.03 1.01,17.05 1.01,17.08 L1.00,17.08 L2.68,54.14 C2.68,54.25 2.69,54.35 2.69,54.46 C2.69,54.48 2.70,54.50 2.70,54.53 L2.70,54.60 L2.71,54.61 C2.96,57.19 4.83,59.26 7.38,59.36 L7.38,59.37 L44.80,59.37 C44.81,59.37 44.83,59.37 44.85,59.37 C44.87,59.37 44.88,59.37 44.90,59.37 L44.98,59.37 L44.98,59.36 C47.57,59.29 49.67,57.19 49.89,54.58 L49.89,54.58 L49.90,54.54 C49.90,54.51 49.90,54.49 49.90,54.46 C49.90,54.39 49.91,54.33 49.91,54.26 L51.74,17.05 L51.74,17.05 C51.74,17.04 51.74,17.02 51.74,17.00"></path>
                                        </svg>
                                    </div>
                                    <div className="center Oj2Oo7"><img className="PhxDN7" src=""/>
                                        <video data-dashjs-player="true" className="tpgcVs" autoPlay=""
                                               poster=""></video>
                                    </div>
                                </div>


                                <div className="image-carousel">
                                    <button className="prev-slide">&lt;</button>
                                    <div className="carousel-wrapper">
                                        <div className="carousel">
                                            <img width="450" loading="lazy"
                                                 src={product.imagemain}
                                                 height="450"/>

                                            {product.images && product.images.length > 0 ? (
                                                product.images.map((image, index) => (

                                                    <img width="450" height="450" loading="lazy"

                                                         srcSet={image} src={image} />

                                                ))
                                            ) : (
                                                <p>No images available.</p>
                                            )}

                                        </div>
                                    </div>
                                    <button className="next-slide">&gt;</button>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>
                <section style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ccc',
                    marginRight: '10px'
                }} className="flex flex-auto i9t0tr"><h2 className="Bf9ap6">Product Information Section</h2>
                    <div className="flex-auto flex-column  DXQgih">
                        <div className="WBVL_7"><img alt="mall inline badge" className="fclWZr"
                                                     src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/40a453875daccf8cc324.svg"/><span>{product.name}</span>
                        </div>
                        <div className="content">
                            <div>
                                <span className="label">Product ID</span>
                                <span className="value">{product.productId}</span>
                            </div>
                            <div>
                                <span className="label">Description</span>
                                <span className="value">{product.description}</span>
                            </div>
                            <div>
                                <span className="label">Price</span>
                                <span className="value">{product.price}</span>
                            </div>
                            <div>
                                <span className="label">Category</span>
                                <span className="value">{product.categoryId}</span>
                            </div>
                            <div>
                                <span className="label">Stock</span>
                                <span className="value">{product.stock}</span>
                            </div>
                            <div>
                                <span className="label">Brand</span>
                                <span className="value">{product.brand}</span>
                            </div>
                            <div>
                                <span className="label">Sold quantity</span>
                                <span className="value">{product.soldQuantity}</span>
                            </div>
                            <div>
                                <span className="label">Cost</span>
                                <span className="value">{product.cost}</span>
                            </div>


                        </div>
                    </div>
                </section>
            </div>
            <section className="product-briefing">
                <section className="comments">
                    {currentComments && currentComments.length > 0 ? (
                        currentComments.map((comment, index) => (
                            <div key={index} className="comment">
                                <img src={comment.avatar} alt="avatar" className="avatar"/>
                                <div className="comment-details">
                                    <h2>{comment.name}</h2>
                                    <p className="date">{comment.reviewDate}</p>
                                    <p className="review">{comment.comment}</p>
                                    <p className="rating">Rating: {comment.rating} / 5</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments available.</p>
                    )}
                </section>

                {totalComments > commentsPerPage && (
                    <div className="pagination">
                        {Array.from({length: Math.ceil(totalComments / commentsPerPage)}, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
}
export default AdminDetailProduct;