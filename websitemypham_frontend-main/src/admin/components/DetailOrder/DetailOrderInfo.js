import React, {useEffect, useState} from "react";
import './OrderDetail.css';




const DetailOrderInfoTable = ({ order }) => {
    const token = sessionStorage.getItem("jwtToken");
    const jwt = token;
    const [customerName, setCustomerName] = useState("");
    useEffect(() => {
        const getCustomerName = async () => {
            if (order.customerId) {
                try {
                    const fetchShipmentResponse = await fetch(`http://localhost:8080/api/customers/customerId/${order.customerId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`
                        }
                    });

                    if (!fetchShipmentResponse.ok) {
                        console.error(`Fetch shipment response not OK. Status: ${fetchShipmentResponse.status}`);
                        const errorText = await fetchShipmentResponse.text();
                        console.error(`Error response text: ${errorText}`);
                        throw new Error(`Error fetching shipment: ${fetchShipmentResponse.status} - ${errorText}`);
                    }

                    const customerData = await fetchShipmentResponse.json();
                    setCustomerName(customerData.name);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        getCustomerName();
    }, [order.customerId]);
    return (
        <table>
            <tbody>
            <tr>
                <th>Order ID:</th>
                <td>{order.orderId}</td>
            </tr>
            <tr>
                <th>Customer Name:</th>
                <td>{order.fullName}</td>
            </tr>
            {/* <tr>
                <th>Customer Name:</th>
                <td>{customerName}</td>
            </tr> */}
            <tr>
                <th>Email:</th>
                <td>{order.email}</td>
            </tr>
            <tr>
                <th>Phone Number:</th>
                <td>{order.phone}</td>
            </tr>
            <tr>
                <th>Shipping Address:</th>
                <td>{order.shippingAddress}</td>
            </tr>
            <tr>
                <th>Order Date:</th>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
            </tr>
            <tr>
                <th>Total Amount:</th>
                <td>{order.totalAmount} USD</td>
            </tr>
            <tr>
                <th>Payment Method:</th>
                <td>{order.paymentMethod}</td>
            </tr>
            </tbody>
        </table>
    );
};

export default DetailOrderInfoTable;
