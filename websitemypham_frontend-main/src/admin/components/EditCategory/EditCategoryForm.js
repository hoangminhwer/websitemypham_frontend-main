import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const EditCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const jwtToken = token;
  const [formData, setFormData] = useState({
    id:'',
    categoryId: id,
    name: '',
    description:''
  });
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categories/${formData.categoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setFormData({
          id:data.id,
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
        });
      } catch (error) {
        console.error('Error fetching account data:', error);
        alert('Error fetching account data');
      }
    };
    fetchCategoryData();
  }, [id, jwtToken]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    if (!formData.name.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
  
    
    
    
    
    console.log(formData.id);
    try {
      const response = await fetch(`http://localhost:8080/api/categories/edit/${formData.categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      alert('Category updated successfully!');
      navigate('/admin/category');
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating the account');
    }
  };
  const handleCancelClick = () => {
    navigate('/admin/category');
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
                  <textarea
                      id="description"
                      name="description"
                      type="text"
                      className="form-control"
                      rows={5}
                      
                      value={formData.description}
                      onChange={handleChange}
                  />
                </div>
               
              </div>
              
            </div>
            <div className="card">
              
              <div className="card-body">
            <div className="d-flex flex-wrap gap-2">
              <button type="submit" className="btn btn-primary waves-effect waves-light">
                Save Changes
              </button>
              <button type="button" className="btn btn-secondary waves-effect waves-light"   onClick={handleCancelClick}>
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
export default EditCategoryForm;