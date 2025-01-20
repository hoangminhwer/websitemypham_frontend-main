import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProductForm.css";

const EditProductForm = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [base64, setBase64] = useState("");
  const token = sessionStorage.getItem("jwtToken");
  const jwtToken = token;
  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    name: "",
    description: "",
    descriptionLong: "",
    price: 0,
    categoryId: 0,
    stock: 0,
    imagemain: "",
    images: [""],
    reviews: [
      {
        customerId: "",
        customerName: "",
        rating: 0,
        comment: "",
        avatar: "",
        reviewDate: "",
        updateDate: "",
      },
    ],
    brand: "",
    soldQuantity: 0,
    cost: 0,
  });

  useEffect(() => {
    // console.log("ID product",id);
    // console.log("token",jwtToken);
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`,
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
        // console.log("fetch data",data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
        alert("Error fetching account data");
      }
    };

    fetchProductData();
  }, [id]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64(base64String); // Đặt chuỗi Base64 vào state

      // Log chuỗi Base64 ra console
      // console.log("Base64 URL: ", base64String);
      setFormData((prevFormData) => ({
        ...prevFormData,
        imagemain: base64String,
      }));
    };

    if (file) {
      reader.readAsDataURL(file); // Chuyển file thành chuỗi Base64
    }
  };
  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    // Đọc các file và chuyển chúng thành base64
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        newImages.push(base64String);

        // Kiểm tra nếu tất cả các file đã được xử lý
        if (newImages.length === files.length) {
          setFormData((prevFormData) => {
            // Loại bỏ hình ảnh trống và trùng lặp
            const filteredImages = [
              ...prevFormData.images,
              ...newImages,
            ].filter(
              (image, index, self) => image && self.indexOf(image) === index
            );

            return {
              ...prevFormData,
              images: filteredImages,
            };
          });

          // Log chuỗi Base64 ra console
          console.log("Updated Images Base64 URLs: ", newImages);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu trường thay đổi là 'stock' hoặc 'price'
    if (name === "stock" || name === "price") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
      if (numericValue < 0) {
        alert("Giá trị không được âm!");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else if (name === "categoryId") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value), // Chuyển đổi thành số nếu cần thiết
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!formData.productId.trim()) {
      alert("Mã sản phẩm không được để trống!");
      return;
    }

    if (!formData.name.trim()) {
      alert("Tên sản phẩm không được để trống!");
      return;
    }

    if (!formData.brand.trim()) {
      alert("Thương hiệu không được để trống!");
      return;
    }

    if (!formData.price || formData.price <= 0) {
      alert("Giá sản phẩm phải lớn hơn 0!");
      return;
    }

    if (!formData.stock || formData.stock < 0) {
      alert("Số lượng sản phẩm không hợp lệ!");
      return;
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      alert("Vui lòng chọn danh mục sản phẩm!");
      return;
    }

    if (!formData.description.trim()) {
      alert("Mô tả sản phẩm không được để trống!");
      return;
    }

    if (!formData.descriptionLong.trim()) {
      alert("Mô tả chi tiết sản phẩm không được để trống!");
      return;
    }

    if (!formData.imagemain) {
      alert("Vui lòng tải lên ảnh chính của sản phẩm!");
      return;
    }

    try {
      console.log("form submit", formData);
      const response = await fetch(
        `http://localhost:8080/api/products/${formData.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Product updated successfully!");

      navigate("/admin/product");
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating the product");
    }
  };
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);

    return category ? category.name : "Unknown";
  };
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, index) => index !== indexToRemove),
    }));
  };
  const handleRemoveMainImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imagemain: "", // Xóa hình ảnh chính
    }));
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Edit Product</h4>
        <p className="card-title-desc">Update the product information below</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="productId">Product ID</label>
                <input
                  id="productId"
                  name="productId"
                  type="text"
                  className="form-control"
                  value={formData.productId}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name">Product Name</label>
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
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  className="form-control"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  min="0" // Ngăn giá trị âm
                  onKeyPress={(e) => {
                    if (!/^\d+$/.test(e.key)) {
                      e.preventDefault(); // Ngăn nhập chữ
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cost">Cost</label>
                <input
                  id="cost"
                  name="cost"
                  type="number"
                  className="form-control"
                  value={formData.cost}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label className="control-label">Category</label>
                <select
                  name="categoryId"
                  className="form-control select2"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value={formData.categoryId}>
                    {getCategoryName(formData.categoryId) || "Select"}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="control-label">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  className="form-control"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0" // Ngăn giá trị âm
                  onKeyPress={(e) => {
                    if (!/^\d+$/.test(e.key)) {
                      e.preventDefault(); // Ngăn nhập chữ
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionLong">Long Description</label>
                <textarea
                  className="form-control"
                  id="descriptionLong"
                  name="descriptionLong"
                  rows="5"
                  value={formData.descriptionLong}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-0">Main Image</h4>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {formData.imagemain && (
                <div className="mt-3 image-container">
                  <img
                    src={formData.imagemain}
                    alt="Main"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                  <button
                    className="remove-image-btn"
                    onClick={handleRemoveMainImage}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              <h4 className="card-title mb-0">Additional Images</h4>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesUpload}
              />
              <div className="mt-3">
                <div className="image-gallery">
                  {formData.images.map((image, index) => (
                    <div className="image-container" key={index}>
                      <img
                        src={image}
                        alt={`Additional ${index}`}
                        className="gallery-image"
                      />
                      <button
                        className="remove-image-btn"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
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
              onClick={() => navigate("/admin/product")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
