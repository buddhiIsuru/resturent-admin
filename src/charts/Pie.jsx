import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Pie = () => {
  const [chartConfig, setChartConfig] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 600,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 1537,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="pie"
        height={300}
      />
    </div>
  );
};

export default Pie;
