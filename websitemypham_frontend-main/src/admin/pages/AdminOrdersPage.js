import React, {useEffect, useState} from "react";
import SearchBarOrder from "../components/Orders/SearchBarOrder";
import OrderTable from "../components/Orders/OrderTable";
import PaginationOrderAdmin from "../components/Orders/PaginationOrderAdmin";
import axios from "axios";

const AdminOrdersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("jwtToken");
  const jwt=token;
  useEffect(() => {

    // console.log(token);
    const fetchCustomerData = async () => {

      try {
        const response = await axios.get("http://localhost:8080/api/customers",{

          headers: {
            Authorization: `Bearer ${jwt}`,  // Include the token in the request
          },
        });
        setCustomers(response.data); // Set categories data
      } catch (err) {
        setError(err);
      }
    };
    const fetchData = async () => {

      try {
        const response = await axios.get("http://localhost:8080/api/orders",{

        headers: {
          Authorization: `Bearer ${jwt}`,  // Include the token in the request
        },
        });
        setOrders(response.data); // Set categories data
        // console.log("orders:",response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
    fetchData();
  }, []);

  const getCustomerName = (cusId) => {
    const customer = customers.find(cus => cus.customerId === cusId);

    return customer ? customer.name : "Unknown";
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row mb-2">
              {/* <SearchBarOrder /> */}
            
            </div>
            <OrderTable orders={orders} getCustomerName={getCustomerName} />
            <PaginationOrderAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
