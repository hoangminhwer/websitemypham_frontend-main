import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = sessionStorage.getItem("jwtToken");
  const getSizeListCategories = async () => {
    try {
      const fetchResponse = await fetch(
        `http://localhost:8080/api/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();

        throw new Error(
          `Cannot get size array : ${fetchResponse.status} - ${errorText}`
        );
      }
      const currentData = await fetchResponse.json();
      const sizeArray = currentData.length;
      return sizeArray;
    } catch (error) {
      alert(`Error get size: ${error.message}`);
    }
  };
  const generateCategorytID = async () => {
    try {
      const number = (await getSizeListCategories()) + 1;
      return number;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const newId = await generateCategorytID();
        setFormData((prevData) => ({ ...prevData, categoryId: newId }));
      } catch (error) {
        console.error("Error generating customer ID:", error);
      }
    };

    fetchCategoryId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Tên không được để trống!");
      return;
    }

    if (!formData.description.trim()) {
      alert("Địa chỉ không được để trống!");
      return;
    }

    try {
      console.log(formData);

      const response = await fetch(`http://localhost:8080/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

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
        data = responseText;
      }
      console.log("Success:", data);
      window.alert("Add new category successful!");
      navigate("/admin/category");
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing the request");
    }
  };
  const handleCancelClick = () => {
    window.location.href = "/admin/category";
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Tạo Danh Mục</h4>
        <p className="card-title-desc">Điền thông tin cần thiết</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="categoryId">ID danh mục</label>
                <input
                  id="categoryId"
                  name="categoryId"
                  type="text"
                  className="form-control"
                  value={formData.categoryId}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name">Tên danh mục</label>
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
                <label htmlFor="description">Mô tả</label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
