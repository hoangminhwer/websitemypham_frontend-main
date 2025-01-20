import React from 'react';

const AsideMenu = () => {
  return (
    <aside
      className="off-canvas-wrapper offcanvas offcanvas-start"
      tabIndex="-1"
      id="AsideOffcanvasMenu"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h1 className="d-none" id="offcanvasExampleLabel">Aside Menu</h1>
        <button
          className="btn-menu-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          menu <i className="fa fa-chevron-left"></i>
        </button>
      </div>
      <div className="offcanvas-body">
        <div id="offcanvasNav" className="offcanvas-menu-nav">
          <ul>
            <li className="offcanvas-nav-parent">
              <a className="offcanvas-nav-item" href="#">home</a>
              <ul>
                <li><a href="index.html">Home One</a></li>
                <li><a href="index-two.html">Home Two</a></li>
              </ul>
            </li>
            <li className="offcanvas-nav-parent">
              <a className="offcanvas-nav-item" href="about-us.html">about</a>
            </li>
            <li className="offcanvas-nav-parent">
              <a className="offcanvas-nav-item" href="#">shop</a>
              <ul>
                <li>
                  <a href="#" className="offcanvas-nav-item">Shop Layout</a>
                  <ul>
                    <li><a href="product.html">Shop 3 Column</a></li>
                    <li><a href="product-four-columns.html">Shop 4 Column</a></li>
                    <li><a href="product-left-sidebar.html">Shop Left Sidebar</a></li>
                    <li><a href="product-right-sidebar.html">Shop Right Sidebar</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="offcanvas-nav-item">Single Product</a>
                  <ul>
                    <li><a href="product-details-normal.html">Single Product Normal</a></li>
                    <li><a href="product-details-normal.html">Single Product Variable</a></li>
                    <li><a href="product-details-group.html">Single Product Group</a></li>
                    <li><a href="product-details-affiliate.html">Single Product Affiliate</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="offcanvas-nav-item">Others Pages</a>
                  <ul>
                    <li><a href="product-cart.html">Shopping Cart</a></li>
                    <li><a href="product-checkout.html">Checkout</a></li>
                    <li><a href="product-wishlist.html">Wishlist</a></li>
                    <li><a href="product-compare.html">Compare</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="offcanvas-nav-parent">
              <a className="offcanvas-nav-item" href="#">Blog</a>
              <ul>
                <li>
                  <a className="offcanvas-nav-item" href="#">Blog Layout</a>
                  <ul>
                    <li><a href="blog.html">Blog Grid</a></li>
                    <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                    <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                  </ul>
                </li>
                <li><a href="blog-details.html">Blog Details</a></li>
              </ul>
            </li>
            <li className="offcanvas-nav-parent">
              <a className="offcanvas-nav-item" href="#">Pages</a>
              <ul>
                <li><a href="account-login.html">My Account</a></li>
                <li><a href="faq.html">Frequently Questions</a></li>
                <li><a href="page-not-found.html">Page Not Found</a></li>
              </ul>
            </li>
            <li className="offcanvas-nav-parent">
              <a className="offcanvas-nav-item" href="contact.html">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default AsideMenu;
