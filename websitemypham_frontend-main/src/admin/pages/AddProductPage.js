import React from 'react';
import ProductForm from '../components/AddProduct/ProductForm';
import ProductImages from '../components/AddProduct/ProductImages';
import MetaDataForm from '../components/AddProduct/MetaDataForm';


const AddProductPage = () => {
  return (
    <div className="row">
      <div className="col-12">
        <ProductForm />

      </div>
    </div>
  );
};

export default AddProductPage;
