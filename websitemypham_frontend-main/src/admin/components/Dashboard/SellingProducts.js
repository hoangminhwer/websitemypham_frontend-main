import React from 'react';

const SellingProducts = ({ products = [] }) => {
  return (
    <div className="card">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Sản phẩm bán chạy</h4>
      </div>
      <div className="card-body px-0 pt-2">
        <div className="table-responsive px-3" style={{ maxHeight: '395px', overflowY: 'auto' }}>
          <table className="table align-middle table-nowrap">
            <tbody>
              {products.length > 0 ? products.map((product, index) => (
                <tr key={index}>
                  <td style={{ width: '50px' }}>
                    <div className="avatar-md me-4">
                      <img src={product.imagemain} className="img-fluid" alt={product.name} />
                    </div>
                  </td>
                  <td>
                    <div>
                      <h5 className="font-size-15">
                        <a href="#" className="text-dark">{product.name}</a>
                      </h5>
                      <span className="text-muted">{product.price} VND</span>
                    </div>
                  </td>
                  <td>
                    <p className="mb-1"><a href="#" className="text-dark">{product.status || 'Sẵn có'}</a></p>
                    <span className="text-muted">{product.stock} sản phẩm</span>
                  </td>
                  <td>
                    <div className="text-end">
                      {/* <ul className="mb-1 ps-0">
                        {[...Array(Math.max(0, Math.min(product.rating || 0, 5)))].map((_, i) => (
                          <li key={i} className="bx bxs-star text-warning"></li>
                        ))}
                        {[...Array(5 - Math.max(0, Math.min(product.rating || 0, 5)))].map((_, i) => (
                          <li key={i} className="bx bx-star text-warning"></li>
                        ))}
                      </ul> */}
                      <span className="text-muted mt-1">{product.soldQuantity} đã bán</span>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan="4">No products found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellingProducts;
