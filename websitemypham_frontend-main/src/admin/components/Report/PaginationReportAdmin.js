import React from "react";

const PaginationReportAdmin = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <a className="page-link" onClick={() => handlePageClick(i)}>
            {i < 10 ? `0${i}` : i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-10">
      <li className="page-item">
        <a className="page-link previous" href="#" onClick={handlePrevious}>
          <span className="fa fa-chevron-left" aria-hidden="true"></span>
        </a>
      </li>
      {renderPageNumbers()}
      <li className="page-item">
        <a className="page-link next" href="#" onClick={handleNext}>
          <span className="fa fa-chevron-right" aria-hidden="true"></span>
        </a>
      </li>
    </ul>
  );
};

export default PaginationReportAdmin;
