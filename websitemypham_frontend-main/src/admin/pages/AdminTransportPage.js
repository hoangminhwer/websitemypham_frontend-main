import React, {useEffect, useState} from "react";
import SearchBarTransport from "../components/Transport/SearchBarTransport";
import AddTransportButton from "../components/Transport/AddTransportButton";
import TransportTable from "../components/Transport/TransportTable";
import PaginationTransportAdmin from "../components/Transport/PaginationTransportAdmin";
import axios from "axios";


const AdminTransportPage = () => {

  const [trans, setTrans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("jwtToken");
  const jwt=token;

  useEffect(() => {

    const fetchData = async () => {
      // console.log("key:",jwt);
      try {
        const response = await axios.get("http://localhost:8080/api/shipments",{

          headers: {
            Authorization: `Bearer ${jwt}`,  // Include the token in the request
          },
        });
        setTrans(response.data); // Set categories data
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
              {/* <SearchBarTransport /> */}
              {/* <AddTransportButton /> */}
            </div>
            <TransportTable transports={trans} />
            <PaginationTransportAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransportPage;
