import React from 'react';

const EditAccountImages = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title mb-0">Avatar</h4>
      </div>
      <div className="card-body">
        <form action="/" method="post" className="dropzone">
          <div className="fallback">
            <input name="file" type="file" multiple />
          </div>
          <div className="dz-message needsclick">
            <div className="mb-3">
              <i className="display-4 text-muted bx bxs-cloud-upload"></i>
            </div>
            <h4>Drop files here or click to upload.</h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountImages;
