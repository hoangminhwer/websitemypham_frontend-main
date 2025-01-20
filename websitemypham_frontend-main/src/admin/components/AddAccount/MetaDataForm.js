import React from 'react';

const MetaDataForm = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Meta Data</h4>
        <p className="card-title-desc">Fill all information below</p>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="metatitle">Meta title</label>
                <input id="metatitle" name="productname" type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="metakeywords">Meta Keywords</label>
                <input id="metakeywords" name="manufacturername" type="text" className="form-control" />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="metadescription">Meta Description</label>
                <textarea className="form-control" id="metadescription" rows="5"></textarea>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button type="submit" className="btn btn-primary waves-effect waves-light">
              Save Changes
            </button>
            <button type="submit" className="btn btn-secondary waves-effect waves-light">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MetaDataForm;
