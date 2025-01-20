import React from 'react';
import "./CategoryRow.css";
import {useNavigate} from "react-router-dom";

const token = sessionStorage.getItem("jwtToken");
const CategoryRow = ({ cate }) => {
   

    const navigate = useNavigate();

    const handleDelete = async () => {
        
        const isConfirmed = window.confirm('Do you want delete this category?');

        if (!isConfirmed) {
            return; 
        }

        try {
            const response = await fetch(`http://localhost:8080/api/categories/${cate.categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lỗi : ${response.status} - ${errorText}`);
            }

            alert('Deleted successful!');
            
            window.location.reload();


        } catch (error) {
            console.error('Error:', error);
            alert('Deleted Error');
        }
    };
    const handleEditAccountClick = () => {
        navigate(`/admin/edit-category/${cate.categoryId}`);
    };

    return (
        <tr className="order-row">
            {/* <td>
                <div className="form-check font-size-16">
                    <input className="form-check-input" type="checkbox" id={`orderidcheck${customer.id}`} />
                    <label className="form-check-label" htmlFor={`orderidcheck${customer.id}`}></label>
                </div>
            </td> */}
            <td>
                <a href="#" className="text-body fw-bold">
                    {cate.categoryId}
                </a>
            </td>
            <td>{cate.name}</td>
            <td>{cate.description}</td>
        
            <td>
                <button className='custom-button' >
                    Xem chi tiết
                </button>
            </td>
            <td>
                <div className="d-flex gap-3">
                    <a href="#" className="text-success" onClick={handleEditAccountClick} >
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

export default CategoryRow;