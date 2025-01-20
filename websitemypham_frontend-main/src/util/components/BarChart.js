import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ series, colors, categories }) => {
  const options = {
    chart: { type: 'bar', height: 400, stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '40%' } },
    colors: colors,
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    legend: { show: false },
    yaxis: {
      labels: {
        formatter: function (value) {
          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -90,
        formatter: function (value) {
          return `Tháng ${value}`;  // Thêm chữ "Tháng" trước mỗi số tháng
        },
      },
    }, tooltip: {
      y: {
        formatter: function (value) {
          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
      },
    },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={400} />;
};

export default BarChart;
