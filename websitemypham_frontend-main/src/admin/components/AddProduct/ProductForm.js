import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState("");
  const token = sessionStorage.getItem("jwtToken");
  const jwtToken = token;
  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    description: "",
    descriptionLong: "",
    price: 0,
    categoryId: 0,
    stock: 0,
    imagemain: "",
    images: [],
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64(base64String); // Đặt chuỗi Base64 vào state

   
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

        if (newImages.length === files.length) {
          setFormData((prevFormData) => {
     
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

  // useEffect để gọi API khi component mount
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

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Kiểm tra nếu trường thay đổi là 'stock'
    if (['stock', 'price', 'cost'].includes(name)) {
      const numericValue = parseFloat(value);
  
      // Ngăn chặn giá trị âm cho stock, price, và cost
      if (numericValue < 0) {
        alert(`${name === 'stock' ? 'Số lượng sản phẩm' : name === 'price' ? 'Giá sản phẩm' : 'Chi phí sản phẩm'} không được âm!`);
        return;
      }
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue // Lưu giá trị số dương vào formData
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  
  const getSize = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:8080/api/products`, {
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

      console.log("size array :", currentData.length);
      const sizeArrayShipments = currentData.content?.length;
      return sizeArrayShipments;
    } catch (error) {
      alert(`Error get size: ${error.message}`);
    }
  };
  const generateID = async () => {
    try {
      const number = (await getSize()) + 1;
      const text = "P";
      const formatNumber = number.toString().padStart(3, "0");
      const newShipmentID = text + formatNumber;
      return newShipmentID;
    } catch (error) {
      console.error("Error generating shipment ID:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchId = async () => {
      try {
        const newId = await generateID();
        setFormData((prevData) => ({ ...prevData, productId: newId }));
      } catch (error) {
        console.error("Error generating customer ID:", error);
      }
    };

    fetchId();
  }, []);
  // Xử lý sự kiện gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ràng buộc dữ liệu
    if (!formData.name.trim()) {
      alert("Tên sản phẩm là bắt buộc!");
      return;
    }

    if (!formData.brand.trim()) {
      alert("Thương hiệu là bắt buộc!");
      return;
    }

    if (formData.price <= 0) {
      alert("Giá sản phẩm phải lớn hơn 0!");
      return;
    }

    if (formData.categoryId === 0) {
      alert("Vui lòng chọn danh mục sản phẩm!");
      return;
    }

    if (formData.stock < 0) {
      alert("Số lượng sản phẩm không được âm!");
      return;
    }

    if (!formData.imagemain) {
      alert("Vui lòng tải lên ảnh chính của sản phẩm!");
      return;
    }

    console.log("form data:", formData);
    try {
      const response = await fetch(`http://localhost:8080/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read response text for error
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Success:", data);
      window.alert("Add product successful!");
      setFormData({
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
      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = "";
      }
      if (additionalImagesInputRef.current) {
        additionalImagesInputRef.current.value = "";
      }
      window.location.href = "/admin/product";
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCancelClick = () => {
    window.location.href = "/admin/product";
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
                  <option value="">Select</option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))
                  )}
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
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionLong">Product Long Description</label>
                <textarea
                  className="form-control"
                  id="descriptionLong"
                  name="descriptionLong"
                  rows="5"
                  value={formData.descriptionLong}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <h3>Upload Image main</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={mainImageInputRef}
                />
              </div>
              <h3>Upload Additional Images</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesUpload}
                ref={additionalImagesInputRef}
              />
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

export default ProductForm;
