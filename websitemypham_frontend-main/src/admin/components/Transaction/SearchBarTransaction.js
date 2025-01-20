import React from 'react';

const SearchBarTransaction = () => {
  return (
    <div className="col-sm-4">
      <div className="search-box me-2 mb-2 d-inline-block">
        <div className="position-relative">
          <input type="text" className="form-control" placeholder="Search..." />
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default SearchBarTransaction;
