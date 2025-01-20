import React from 'react';
import DonutChart from '../../../util/components/DonutChart';


const DashboardCard = ({ title, value, badgeText, badgeColor, description, series, colors }) => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="card card-h-100">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <span className="text-muted mb-3 lh-1 d-block text-truncate">{title}</span>
              <h4 className="mb-3">
                {value}
              </h4>
              <div className="text-nowrap">
                <span className={`badge ${badgeColor} text-success`}>{badgeText}</span>
                <span className="ms-1 text-muted font-size-13">{description}</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-end dash-widget">
              <DonutChart series={series} colors={colors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
