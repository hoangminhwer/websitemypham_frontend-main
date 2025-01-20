import React, { useState } from 'react';
import "./specification.css";
const ProductSpecification = ({ descriptionLong }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit the number of characters to show when not expanded
  const limit = 2000; // Change the limit as needed

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="tab-pane" id="specification" role="tabpanel" aria-labelledby="specification-tab">
      <div>
        {isExpanded ? (
          // Show full content if expanded
          <div dangerouslySetInnerHTML={{ __html: descriptionLong }}></div>
        ) : (
          // Show limited content if not expanded
          <div>
            <div dangerouslySetInnerHTML={{ __html: descriptionLong.slice(0, limit) + '...' }}></div>
            <button onClick={toggleExpanded} className="read-more-btn">Hiện thêm</button>
          </div>
        )}

        {/* Show "Read less" when expanded */}
        {isExpanded && <button onClick={toggleExpanded} className="read-less-btn">Ẩn</button>}
      </div>
    </div>
  );
};

export default ProductSpecification;
