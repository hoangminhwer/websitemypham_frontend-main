import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAccountForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const jwtToken = token;
  const [formData, setFormData] = useState({
    id: "",
    customerId: "",
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    phoneNumber: "",
    avatar: "",
  });
  const [file, setFile] = useState(null); // State to store the selected file

  const handleImageUpload = async (file) => {
    if (file) {
      const imageFormData = new FormData(); // Use a different variable name
      imageFormData.append("folder", "mypham_folder");
      imageFormData.append("upload_preset", "aqduwiub");
      imageFormData.append("file", file);

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvusnikpw/image/upload",
          imageFormData
        );
        const imageUrl = response.data.secure_url;

        console.log("Image URL after upload:", imageUrl);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Return null if upload fails
      }
    }
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    console.log(formData.id);
    const fetchAccountData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/customers/customerId/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        setFormData({
          id: data.id,
          customerId: data.customerId,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          address: data.address,
          phoneNumber: data.phoneNumber,
          avatar: data.avatar,
        });
      } catch (error) {
        console.error("Error fetching account data:", error);
        alert("Error fetching account data");
      }
    };

    fetchAccountData();
  }, [id, jwtToken]);

  // Update state when user inputs data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!formData.name.trim()) {
      alert("Tên không được để trống!");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email không được để trống!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email không đúng định dạng!");
      return;
    }

    if (!formData.password.trim()) {
      alert("Mật khẩu không được để trống!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (!formData.role.trim()) {
      alert("Vai trò không được để trống!");
      return;
    }

    if (!formData.address.trim()) {
      alert("Địa chỉ không được để trống!");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      alert("Số điện thoại không được để trống!");
      return;
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      alert("Số điện thoại phải là số!");
      return;
    }

    const url = await handleImageUpload(file);
    const updatedFormData = {
      ...formData,
      avatar: url || formData.avatar, // Use new URL or keep the existing one
    };
    console.log(updatedFormData);
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${formData.customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      alert("Account updated successfully!");
      navigate("/admin/account");
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating the account");
    }
  };
  const handleCancelClick = () => {
    navigate("/admin/account");
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Basic Information</h4>
        <p className="card-title-desc">Fill all information below</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Form fields for customer details */}
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="customerId">Customer ID</label>
                <input
                  id="customerId"
                  name="customerId"
                  type="text"
                  className="form-control"
                  value={formData.customerId}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label className="control-label">Role</label>
                <select
                  name="role"
                  className="form-control select2"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="control-label">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">Phone number</label>
                <textarea
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  rows="1"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Avatar</h4>
            </div>
            <div className="card-body">
              {/* File input for avatar */}
              <input name="file" type="file" onChange={handleFileChange} />
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Current Avatar"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              )}
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary waves-effect waves-light"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountForm;
