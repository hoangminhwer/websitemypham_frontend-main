import React, {useEffect, useState} from "react";

import axios from "axios";
import SearchBarPayment from "../components/Payment/SearchBarPayment";
import AddPaymentButton from "../components/Payment/AddPaymentButton";
import PaymentTable from "../components/Payment/PaymentTable";
import PaginationPaymentAdmin from "../components/Payment/PaginationPaymentAdmin";



const AdminPaymentPage = () => {

    const [payments, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("jwtToken");
        const jwt=token;


        const fetchData = async () => {

            try {
                const response = await axios.get("http://localhost:8080/api/payments",{

                    headers: {
                        Authorization: `Bearer ${jwt}`,  // Include the token in the request
                    },
                });
                setPayment(response.data); // Set categories data
                console.log("payments:",response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;




    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-2">
                            {/* <SearchBarPayment /> */}
                            <AddPaymentButton />
                        </div>
                        <PaymentTable payments={payments} />
                        <PaginationPaymentAdmin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPaymentPage;
