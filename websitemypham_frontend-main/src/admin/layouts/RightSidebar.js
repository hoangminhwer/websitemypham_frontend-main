import React from "react";

function Rightbar() {
  return (
    <div className="right-bar">
      <div data-simplebar className="h-100">
        <div className="rightbar-title d-flex align-items-center p-3">
          <h5 className="m-0 me-2">Theme Customizer</h5>

          <a href="javascript:void(0);" className="right-bar-toggle ms-auto">
            <i className="mdi mdi-close noti-icon"></i>
          </a>
        </div>
        <hr className="m-0" />
      </div>
    </div>
  );
}
export default Rightbar;
