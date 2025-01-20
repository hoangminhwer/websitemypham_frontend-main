import React from "react";

const BreadCrumb = ({ title, breadcrumb }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <div className="page-title-right">
            <ol className="breadcrumb m-0">      
              {breadcrumb.map((item, index) => (
                <li
                  key={index}
                  className={`breadcrumb-item ${item.active ? "active" : ""}`}
                  aria-current={item.active ? "page" : undefined}
                >
                  {!item.active ? (
                    <a className="text-dark" href={item.href}>
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-dark">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumb;
