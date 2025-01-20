import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./ProductRow.css";
import { toast } from "react-toastify"; 

const token = sessionStorage.getItem("jwtToken");
const jwtToken = token;

const ProductRow = ({ product, getCategoryName }) => {
    const navigate = useNavigate();


    const handleDetail = () => {
        navigate(`/admin/product/detail/${product.productId}`);
    };
  

    const handleDelete = async () => {
        // Show confirmation dialog
        const isConfirmed = window.confirm('Bạn muốn xóa sản phẩm này không?');

        if (!isConfirmed) {
            return; // Exit if the user clicked "Cancel"
        }

        try {
            const response = await fetch(`http://localhost:8080/api/products/${product.productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lỗi : ${response.status} - ${errorText}`);
            }

            // // Handle successful delete response
            alert('Xóa sản phẩm thành công!');
            
            window.location.reload();

           
            

        } catch (error) {
            console.error('Error:', error);
            alert('Xóa không thành công');
        }
    };

    const handleEditProductClick = () => {
        navigate(`/admin/product/editproduct/${product.productId}`); // Pass product ID as a route parameter
    };

    return (
        <tr className="order-row">
         
            <td>
                <a href="#" className="text-body fw-bold">
                    {product.productId}
                </a>
            </td>
            <td>{product.name}</td>
            <td>{getCategoryName(product.categoryId)}</td>
            <td>{product.stock}</td>
            <td>{product.soldQuantity}</td>
            <td>
                <i className={`fa fa-money me-1`}></i> {product.price}
            </td>
            <td>
                <i className={`fa fa-money me-1`}></i> {product.cost}
            </td>
            <td>
                <button className='custom-button' onClick={handleDetail}>
                    Xem chi tiết
                </button>
            </td>
            <td>
                <div className="d-flex gap-3">
                    <a href="#" className="text-success" onClick={handleEditProductClick}>
                        <i className="mdi mdi-pencil font-size-18"></i>
                    </a>
                    <a href="#" className="text-danger" onClick={handleDelete}>
                        <i className="mdi mdi-delete font-size-18"></i>
                    </a>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;
