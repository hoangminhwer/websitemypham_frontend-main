import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "../components/Transport/DetailTransport.css"
import axios from "axios";


const AdminDetailShippingPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shipping,setShipping] = useState({});
    const { id } = useParams();
    const token = sessionStorage.getItem("jwtToken");
    const jwt = token;
    useEffect(() => {
        const fetchData = async () => {


            try {
                const response = await axios.get(`http://localhost:8080/api/shipments/detail/${id}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                // console.log("API Response:", response.data);
                setShipping(response.data);
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

// Sử dụng hàm
    const formattedDate = formatDate('2024-08-05T00:00:00.000Z');
    // console.log(formattedDate); // Kết quả: "5 tháng 8, 2024"

    return (
        <div className="container_shipping">
            <div className="header">Shipping Information </div>
            <div className="content">
                <div>
                    <span className="label">Shipping ID</span>
                    <span className="value">{shipping.shipmentId}</span>
                </div>
                <div>
                    <span className="label">Order ID</span>
                    <span className="value">{shipping.orderId}</span>
                </div>
                <div>
                    <span className="label">Carrier</span>
                    <span className="value">{shipping.carrier}</span>
                </div>
                <div>
                    <span className="label">Tracking number</span>
                    <span className="value">{shipping.trackingNumber}</span>
                </div>
                <div>
                    <span className="label">Shipping Date</span>
                    <span className="value">{formatDate(shipping.shipmentDate)}</span>
                </div>
                <div>
                    <span className="label">Delivery Estimate</span>
                    <span className="value">{formatDate(shipping.deliveryEstimate)}</span>
                </div>
                <div>
                    <span className="label">Status</span>
                    <span className="value">{shipping.status}</span>
                </div>

            </div>
        </div>

    );
}
export default AdminDetailShippingPage;