import React from 'react';
import MetaDataForm from '../components/AddProduct/MetaDataForm';
import AccountForm from '../components/AddAccount/AccountForm';
import AccountImages from '../components/AddAccount/AccountImages';


const AddAccountPage = () => {
  return (
    <div className="row">
      <div className="col-12">
        <AccountForm />
      </div>
    </div>
  );
};

export default AddAccountPage;
