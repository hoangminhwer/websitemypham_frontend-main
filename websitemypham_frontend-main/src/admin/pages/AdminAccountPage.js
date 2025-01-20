import React, {useEffect, useState} from "react";
import SearchBarAccount from "../components/Account/SearchBarAccount";
import AddAccountButton from "../components/Account/AddAccountButton";
import AccountTable from "../components/Account/AccountTable";
import PaginationAccountAdmin from "../components/Account/PaginationAccountAdmin";
import axios from "axios";

const AdminAccountPage = () => {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("jwtToken");
  const jwt=token;
  useEffect(() => {

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

    fetchCustomerData();

  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row mb-2">
              {/* <SearchBarAccount /> */}
              <AddAccountButton />
            </div>
            <AccountTable customers={customers} />
            <PaginationAccountAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountPage;
