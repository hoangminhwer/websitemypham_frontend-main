import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountForm = () => {
  const [formData, setFormData] = useState({
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

  // Callback function to handle image URL from Cloudinary
  const handleImageUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("folder", "mypham_folder");
      formData.append("upload_preset", "aqduwiub");
      formData.append("file", file);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvusnikpw/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;

      console.log("Image URL after upload:", imageUrl);
      return imageUrl;
    }
  };

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const token = sessionStorage.getItem("jwtToken");
  const jwtToken = token;
  const getSizeShipment = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:8080/api/customers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!fetchResponse.ok) {
        console.error(`Fetch response not OK. Status: ${fetchResponse.status}`);
        const errorText = await fetchResponse.text();
        console.error(`Error response text: ${errorText}`);
        throw new Error(
          `Cannot get size array : ${fetchResponse.status} - ${errorText}`
        );
      }

      const currentData = await fetchResponse.json();
      console.log("Fetched current data:", currentData);

      console.log("size array shipments:", currentData.length);
      const sizeArrayShipments = currentData.length;
      return sizeArrayShipments;
    } catch (error) {
      alert(`Error get size: ${error.message}`);
    }
  };
  const generateShipmentID = async () => {
    try {
      const number = (await getSizeShipment()) + 1;
      const text = "C";
      const formatNumber = number.toString().padStart(3, "0");
      const newShipmentID = text + formatNumber;
      return newShipmentID;
    } catch (error) {
      console.error("Error generating shipment ID:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const newId = await generateShipmentID();
        setFormData((prevData) => ({ ...prevData, customerId: newId }));
      } catch (error) {
        console.error("Error generating customer ID:", error);
      }
    };

    fetchCustomerId();
  }, []);

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

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email không hợp lệ!");
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
      alert("Vui lòng chọn vai trò!");
      return;
    }

    if (!formData.address.trim()) {
      alert("Địa chỉ không được để trống!");
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Số điện thoại không hợp lệ (phải từ 10-15 số)!");
      return;
    }

    if (!file) {
      alert("Vui lòng tải lên ảnh đại diện!");
      return;
    }

    try {
      const url = await handleImageUpload(file);
      const updatedFormData = {
        ...formData,
        avatar: url,
      };

      // Check if formData.avatar is updated before sending it
      console.log("Avatar URL in handleSubmit:", updatedFormData.avatar);
      console.log(updatedFormData);

      const response = await fetch(
        `http://localhost:8080/api/customers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = responseText; // If it fails, keep it as text
      }
      console.log("Success:", data);
      window.alert("Registration successful!");

      setFormData({
        customerId: "",
        name: "",
        email: "",
        password: "",
        role: "",
        address: "",
        phone: "",
        avatar: "",
      });

      setFile(null); // Clear file input
      window.location.href = "/admin/account";
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing the request");
    }
  };
  const handleCancelClick = () => {
    window.location.href = "/admin/account";
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Basic Information</h4>
        <p className="card-title-desc">Fill all information below</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
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

          <div className="mb-3">
            <label htmlFor="avatar">Avatar</label>
            <input type="file" id="avatar" onChange={handleFileChange} />
          </div>

          {file && (
            <div>
              <h5>Selected Avatar:</h5>
              <img
                src={URL.createObjectURL(file)}
                alt="Avatar Preview"
                width="100px"
              />
            </div>
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
              onClick={handleCancelClick} // Gọi hàm khi nhấn nút
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
