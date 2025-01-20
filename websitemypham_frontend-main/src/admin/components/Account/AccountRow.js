import React from 'react';
import "./AccountRow.css";
import {useNavigate} from "react-router-dom";

// const {token}=require('../Dashboard/InitJWTToken');
const token = sessionStorage.getItem("jwtToken");
const jwt=token;
const AccountRow = ({ customer }) => {
    const handleDelete = async () => {
        // Show confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this customer?');

        if (!isConfirmed) {
            return; // Exit if the user clicked "Cancel"
        }

        try {
            console.log(customer.customerId);
            const response = await fetch(`http://localhost:8080/api/customers/${customer.customerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
            }

            // Handle successful delete response
            alert('Customer deleted successfully!');
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
            alert('Error processing the request');
        }
    };

    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/admin/account/${customer.customerId}`); // Pass customer ID as a route parameter
    };
    const handleEditAccountClick = () => {
        navigate(`/admin/account/editaccount/${customer.customerId}`); // Pass customer ID as a route parameter
    };

    return (
        <tr className="order-row">
         
            <td>
                <a href="#" className="text-body fw-bold">
                    {customer.customerId}
                </a>
            </td>
            <td>{customer.name}</td>
            <td>{customer.phoneNumber}</td>
            <td>
                <img style={{ height: '50px' }} src={customer.avatar} alt="Avatar" />
            </td>
            <td>
                {customer.address}
            </td>
            <td>
                <button className='custom-button' onClick={handleDetail}>
                    Xem chi tiết
                </button>
            </td>
            <td>
                <div className="d-flex gap-3">
                    <a  className="text-success" onClick={handleEditAccountClick}>
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

export default AccountRow;
