import React from 'react';

const PaginationTransportAdmin = () => {
  return (
    <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-10">
      <li className="page-item">
        <a className="page-link previous" href="#" aria-label="Previous">
          <span className="fa fa-chevron-left" aria-hidden="true"></span>
        </a>
      </li>
      <li className="page-item"><a className="page-link" href="#">01</a></li>
      <li className="page-item"><a className="page-link" href="#">02</a></li>
      {/* Add other pages here */}
      <li className="page-item">
        <a className="page-link next" href="#" aria-label="Next">
          <span className="fa fa-chevron-right" aria-hidden="true"></span>
        </a>
      </li>
    </ul>
  );
};

export default PaginationTransportAdmin;
