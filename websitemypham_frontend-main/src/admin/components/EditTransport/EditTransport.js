import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const EditTransport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const jwtToken=token;
  const [formData, setFormData] = useState({
    shipmentId: id,
    orderId: id,
    carrier: "",
    trackingNumber: "",
    shipmentDate: "",
    deliveryEstimate: "",
    status: ""
  });

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/shipments/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

      //   {
      //     "id": "66d301b8d3616663d8556f03",
      //     "shipmentId": "S002",
      //     "orderId": "O003",
      //     "carrier": "Viettel Post",
      //     "trackingNumber": "VT001",
      //     "shipmentDate": "2024-08-04T07:00:00.000Z",
      //     "deliveryEstimate": "2024-08-06T07:00:00.000Z",
      //     "status": "Đã gửi hàng"
      // }

        setFormData({
          shipmentId: data.shipmentId || id,
          orderId: data.orderId || id,
          carrier: data.carrier || "",
          trackingNumber: data.trackingNumber || "",
          shipmentDate: data.shipmentDate || "",
          deliveryEstimate: data.deliveryEstimate || "",
          status: data.status 
        });
        // console.log('Fetched Data:', data);

        // if (Array.isArray(data) && data.length > 0) {
        //   const shipment = data[0];
        //   setFormData({
        //     shipmentId: shipment.shipmentId || id,
        //     orderId: shipment.orderId || id,
        //     carrier: shipment.carrier || "",
        //     trackingNumber: shipment.trackingNumber || "",
        //     shipmentDate: shipment.shipmentDate || "",
        //     deliveryEstimate: shipment.deliveryEstimate || "",
        //     status: shipment.status 
        //   });
        // } else {
        //   console.error('No shipment data found');
        // }
      } catch (error) {
        console.error('Error fetching shipment data:', error);
      }
    };

    fetchShipmentData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  };
  const formatDateToSubmit=(dateString)=>{
    if (!dateString) return "";
    // Create a date object and adjust it to UTC
    const date = new Date(dateString);
    // Format the date to ISO 8601 format
    return date.toISOString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      shipmentDate: formatDateToSubmit(formData.shipmentDate),
      deliveryEstimate: formatDateToSubmit(formData.deliveryEstimate)
    };
    console.log('form submit',submitData)
    try {
      const response = await fetch(`http://localhost:8080/api/shipments/${formData.shipmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(submitData)
      });


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      // console.log('Success:', data);
      window.alert('Update shipment successful!');
      navigate("/admin/transport");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="shipmentId">Shipment ID</label>
                <input
                    id="shipmentId"
                    name="shipmentId"
                    type="text"
                    className="form-control"
                    value={formData.shipmentId}
                    readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="orderId">Order ID</label>
                <input
                    id="orderId"
                    name="orderId"
                    type="text"
                    className="form-control"
                    value={formData.orderId}
                    readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="carrier">Carrier</label>
                <input
                    id="carrier"
                    name="carrier"
                    type="text"
                    className="form-control"
                    value={formData.carrier}
                    onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="trackingNumber">Tracking Number</label>
                <input
                    id="trackingNumber"
                    name="trackingNumber"
                    type="text"
                    className="form-control"
                    value={formData.trackingNumber}
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label className="control-label">Shipment Date</label>
                <input
                    id="shipmentDate"
                    name="shipmentDate"
                    type="date"
                    className="form-control"
                    value={formatDate(formData.shipmentDate)}
                    onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="control-label">Delivery Estimate</label>
                <input
                    id="deliveryEstimate"
                    name="deliveryEstimate"
                    type="date"
                    className="form-control"
                    value={formatDate(formData.deliveryEstimate)}
                    onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status">Status</label>
                <input
                    id="status"
                    name="status"
                    type="text"
                    className="form-control"
                    value={formData.status}
                    readOnly
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary waves-effect waves-light">
            Save Changes
          </button>
        </form>
      </div>
  );
};

export default EditTransport;
