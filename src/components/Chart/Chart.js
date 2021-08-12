import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import "./Chart.css";

function Chart({ label, labels, data }) {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: [
            // "rgba(255, 99, 132, 0.2)",
            // "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
            // pattern.draw('square', '#ff6384'),
            "red",
          ],
          borderColor: [
            // "rgba(255, 99, 132, 1)",
            // "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
            "black",
          ],
          borderWidth: 1,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, [labels, data, label]);

  return (
    <div className="chart">
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}
export default Chart;
