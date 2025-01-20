import React, {useEffect, useState} from "react";
import SearchBarTransaction from "../components/Transaction/SearchBarTransaction";
import AddTransactionButton from "../components/Transaction/AddTransactionButton";
import TransactionTable from "../components/Transaction/TransactionTable";
import PaginationTransactionAdmin from "../components/Transaction/PaginationTransactionAdmin";
import axios from "axios";


const AdminTransactionPage = () => {
    const token = sessionStorage.getItem("jwtToken");
    const jwt=token;
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {


        const fetchData = async () => {

            try {
                const response = await axios.get("http://localhost:8080/api/transactions",{

                    headers: {
                        Authorization: `Bearer ${jwt}`,  // Include the token in the request
                    },
                });
                setTransaction(response.data); // Set categories data
                // console.log("orders:",response.data);
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
                            {/* <SearchBarTransaction /> */}
                        </div>
                        <TransactionTable transaction={transaction} />
                        <PaginationTransactionAdmin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTransactionPage;
