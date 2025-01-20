import React, { useState, useEffect } from 'react';
import './OrderDetail.css';
import axios from "axios";

const DetailOrderTable = ({ products }) => {
    const [productTable,setProductTable] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const details = {};
                for (const product of products) {
                    const response = await axios.get(`http://localhost:8080/api/products/${product.productId}`);
                    details[product.productId] = response.data;
                }
                setProductDetails(details);
            } catch (err) {
                setError(err.message || "An error occurred while fetching product details");
            }
        };

        if (products && products.length > 0) {
            fetchProductDetails();
        
        }
    }, [products]);

    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    // console.log(productDetails);
    // console.log(products);
    return (
        <div className="table-responsive">
            <table className="table align-middle table-nowrap table-check">
                <thead className="table-light">
                <tr>
                    <th style={{ width: '20px' }} className="align-middle">
                        <div className="form-check font-size-16">
                            <input className="form-check-input" type="checkbox" id="checkAll" />
                            <label className="form-check-label" htmlFor="checkAll"></label>
                        </div>
                    </th>
                    <th className="align-middle">Name</th>
                    <th className="align-middle">Image</th>
                    <th className="align-middle">Price</th>
                    <th className="align-middle">Quantity</th>
                    <th className="align-middle">Total</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>
                            <div className="form-check font-size-16">
                                <input className="form-check-input" type="checkbox" id={`product-${index}`}/>
                                <label className="form-check-label" htmlFor={`product-${index}`}></label>
                            </div>
                        </td>

                        <td>{productDetails[product.productId]?.name || 'Loading...'}</td>
                        <td>
                              {/* Hiển thị hình ảnh từ productDetails nếu có */}
                              {productDetails[product.productId]?.imagemain ? (
                                    <img style={{ height: '50px' }} src={productDetails[product.productId].imagemain} alt="Product" />
                                ) : (
                                    'Loading...'
                                )}
                        </td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price * product.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailOrderTable;