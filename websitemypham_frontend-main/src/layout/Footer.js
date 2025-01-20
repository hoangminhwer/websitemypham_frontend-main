import React from "react";

const Footer = () => {
  return (
    <footer className="footer-area pt-5">
      {/*== Start Footer Main ==*/}
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="widget-item">
                <div className="widget-about">
                  <a className="widget-logo" href="/">
                    <img
                      src="assets/images/logo.webp"
                      width="95"
                      height="68"
                      alt="Logo"
                    />
                  </a>
                  <p className="desc">
                    Khám phá bí quyết làm đẹp tự nhiên với dòng mỹ phẩm của
                    chúng tôi – sản phẩm được chiết xuất từ thành phần thiên
                    nhiên, an toàn và lành tính, giúp làn da bạn luôn tươi trẻ
                    và rạng rỡ mỗi ngày!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-5 mt-md-0 mt-9">
              <div className="widget-item">
                <h4 className="widget-title">Information</h4>
                <ul className="widget-nav">
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Login</a>
                  </li>
                  <li>
                    <a href="#">Shop</a>
                  </li>
                  <li>
                    <a href="#">My Account</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mt-lg-0 mt-6">
              <div className="widget-item">
                <h4 className="widget-title">Social Info</h4>
                <div className="widget-social">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.pinterest.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-pinterest-p"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*== End Footer Main ==*/}

      {/*== Start Footer Bottom ==*/}
      <div className="footer-bottom">
        <div className="container pt-0 pb-0">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 HUIT. Made with <i className="fa fa-heart"></i> by
              <a
                target="_blank"
                href="https://themeforest.net/user/codecarnival"
                rel="noopener noreferrer"
              >
                NOLAN
              </a>
            </p>
          </div>
        </div>
      </div>
      {/*== End Footer Bottom ==*/}
    </footer>
  );
};

export default Footer;
