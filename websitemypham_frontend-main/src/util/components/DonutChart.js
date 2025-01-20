import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ series = [], colors = [] }) => {
  const options = {
    chart: { type: "donut", height: 110 },
    colors: colors,
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={110}
    />
  );
};

export default DonutChart;
