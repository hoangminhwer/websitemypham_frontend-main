import React from "react";

const PageHeader = ({ title, breadcrumb}) => {
  return (
    <section
      className="page-header-area pt-10 pb-9"
      style={{ backgroundColor: "#FFF3DA" }}
      data-bg-color="#FFF3DA"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="page-header-st3-content text-center text-md-start">
              <ol className="breadcrumb justify-content-center justify-content-md-start">
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
              <h2 className="page-header-title">{title}</h2>
            </div>
          </div>
    
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
