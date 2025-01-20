import React from 'react';

const PaginationProductAdmin = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // console.log('Rendering pagination:', { totalPages, currentPage });

  if (totalPages === 0) return null; // Không cần phân trang nếu không có sản phẩm

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationProductAdmin;
