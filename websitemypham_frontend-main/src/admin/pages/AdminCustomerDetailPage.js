import '../components/Account/AccountDetail.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminCustomerDetailPage = () => {
    const [customer, setCustomer] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("jwtToken");
    const jwt = token;

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/customers/customerId/${id}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setCustomer(response.data);

                // Fetch order details once customer data is fetched
                if (response.data.orderHistory && response.data.orderHistory.length > 0) {
                    const orderDetailsPromises = response.data.orderHistory.map((order) =>
                        axios.get(`http://localhost:8080/api/orders/${order}`, {
                            headers: { Authorization: `Bearer ${jwt}` },
                        }).then((res) => res.data)
                    );
                    const ordersData = await Promise.all(orderDetailsPromises);
                    setOrderDetails(ordersData);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching customer data:", err);
                setError(err.message || "An error occurred while fetching data");
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [id, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img
                    src={customer.avatar}
                    alt={`${customer.name}'s avatar`}
                    width="100"
                    height="100"
                />
                <p className="last-login">{customer.address}</p>
                <p>{customer.name}</p>
                <p>{customer.phoneNumber}</p>
                <p>{customer.email}</p>
                <div className="sms-alerts">
                    {customer.role}
                    <div className="dot"></div>
                </div>
            </div>

            <div className="order-history">
                <h3>Order History</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderDetails.length > 0 ? (
                        orderDetails.map((order, index) => (
                            // Kiểm tra nếu order không null và có thuộc tính orderId
                            order && order.orderId ? (
                                <tr key={order.orderId || index}>
                                    <td>{order.orderId}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ) : (
                                // Nếu không có orderId hoặc order null
                                <tr key={index}>
                                    <td colSpan="4">Invalid order data</td>
                                </tr>
                            )
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No order history available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCustomerDetailPage;
