import React, { useEffect, useState } from "react";

import CategoryTable from "../components/Category/CategoryTable";
import PaginationCategoryAdmin from "../components/Category/PaginationCategoryAdmin";
import axios from "axios";
import AddAccountButton from "../components/Category/AddAccountButton";
const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("jwtToken");
  const jwt = token;
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories",
          { 
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setCategories(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchCategoryData();
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row mb-2">
              <AddAccountButton />
            </div>
            <CategoryTable categories={categories} />
            {/* <PaginationCategoryAdmin /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCategoriesPage;
