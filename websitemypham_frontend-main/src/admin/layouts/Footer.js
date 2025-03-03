import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
          
            <span>{new Date().getFullYear()} © Dason.</span>
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design & Develop by <a href="#!" className="text-decoration-underline">Themesbrand</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
