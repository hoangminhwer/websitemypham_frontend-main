import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";


const TransportForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const jwtToken=token;
  const [formData, setFormData] = useState({
    shipmentId: "",
    orderId: id,
    carrier: "",
    trackingNumber: "",
    shipmentDate: "",
    deliveryEstimate: "",
    status: 'Chuẩn bị hàng'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Create a date object and adjust it to UTC
    const date = new Date(dateString);
    // Format the date to ISO 8601 format
    return date.toISOString();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      shipmentDate: formatDate(formData.shipmentDate),
      deliveryEstimate: formatDate(formData.deliveryEstimate)
    };
    // console.log(submitData)

    try {
      const response = await fetch(`http://localhost:8080/api/shipments`, {
        method: 'POST',
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
      console.log('Success:', data);
      window.alert('Add shipments successful!');
      navigate("/admin/transport");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="card">
        {/* ... (rest of the JSX remains the same) ... */}
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
                    onChange={handleChange}
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
                    value={formData.shipmentDate}
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
                    value={formData.deliveryEstimate}
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
              {/* ... (rest of the form fields) ... */}
              <button type="submit" className="btn btn-primary waves-effect waves-light">
                Save Changes
              </button>
        </form>
      </div>
  );
};

export default TransportForm;