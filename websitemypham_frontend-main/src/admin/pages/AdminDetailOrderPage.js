import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../components/DetailOrder/OrderDetail.css';

import DetailOrderTable from "../components/DetailOrder/DetailOrderTable";
import { useParams } from "react-router-dom";
import DetailOrderInfoTable from "../components/DetailOrder/DetailOrderInfo";

const OrderDetails = () => {
    const [orderData, setOrderData] = useState({ products: [], orderInfo: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const { id } = useParams();
    const token = sessionStorage.getItem("jwtToken");
    const jwt = token;

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const [productsResponse, orderResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/api/orders/${id}/products`, {
                        headers: { Authorization: `Bearer ${jwt}` },
                    }),
                    axios.get(`http://localhost:8080/api/orders/${id}`, {
                        headers: { Authorization: `Bearer ${jwt}` },
                    })
                ]);

                setOrderData({
                    products: productsResponse.data,
                    orderInfo: orderResponse.data
                });
                setLoading(false);
            } catch (err) {
                setError(err.message || "An error occurred while fetching data");
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [id, jwt]);

    useEffect(() => {
        const getCarrier = async () => {
            if (orderData.orderInfo.orderId) {
                // console.log("order id",orderData.orderInfo.orderId );
                try {
                    const fetchShipmentResponse = await fetch(`http://localhost:8080/api/shipments/${orderData.orderInfo.orderId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!fetchShipmentResponse.ok) {
                        console.error(`Fetch shipment response not OK. Status: ${fetchShipmentResponse.status}`);
                        const errorText = await fetchShipmentResponse.text();
                        console.error(`Error response text: ${errorText}`);
                        throw new Error(`Error fetching shipment: ${fetchShipmentResponse.status} - ${errorText}`);
                    }

                    const shipmentData = await fetchShipmentResponse.json();
                    // console.log("shipment", shipmentData);
                    setCarrier(shipmentData.carrier);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        getCarrier();
    }, [orderData.orderInfo.orderId]); 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const { products, orderInfo } = orderData;

    // console.log(products);
    console.log(orderInfo);

    return (

        <div className="container">
            <h3>Order #{orderInfo.orderId}</h3>
            <div className="order-layout">
                <div className="order-details">
                    <DetailOrderTable products={products}/>
                </div>
                <div className="order-info">
                    <DetailOrderInfoTable order={orderInfo}/>
                </div>
            </div>
            <div className="shipping-method">
                <strong>Phương thức vận chuyển</strong>
                <div>
                    {carrier ? carrier : 'Loading carrier...'} {/* Render the carrier or a loading message */}
                </div>
            </div>
            <div className="order-status">
                <strong>Status:</strong>
                <div>{orderInfo.status}</div>
            </div>
            <div className="buttons">
                <button className="cancel">Hủy đơn hàng</button>
                <button className="print">In nhãn đơn hàng GHTK</button>
                <button className="print">In đơn hàng</button>
                <button className="save">Lưu đơn</button>
            </div>
            <div className="notes">
                <strong>Ghi chú</strong>
                <textarea placeholder="Ghi chú"></textarea>
            </div>
        </div>
    );
};

export default OrderDetails;
