import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-10">
      <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
        <button className="page-link previous" onClick={() => onPageChange(currentPage - 1)} aria-label="Previous">
          <span className="fa fa-chevron-left" aria-hidden="true"></span>
        </button>
      </li>

      {/* Hiển thị số trang */}
      {[...Array(totalPages)].map((_, index) => (
        <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(index)}>
            {index + 1}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
        <button className="page-link next" onClick={() => onPageChange(currentPage + 1)} aria-label="Next">
          <span className="fa fa-chevron-right" aria-hidden="true"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
