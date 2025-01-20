import React from 'react';

const ProductWidget = ({ title, children, mb0 }) => {
  return (
    <div className={`product-widget ${mb0 ? 'mb-0' : ''}`}>
      <h4 className="product-widget-title">{title}</h4>
      {children}
    </div>
  );
};

export default ProductWidget;
