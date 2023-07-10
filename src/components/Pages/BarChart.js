import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

const BarChart = ({ listExpense, listIncome }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // destroy the old chart instance
    }

    chartInstance.current = new Chart(chartContainer.current, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: "Expenses",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: listExpense.map((item) => item.total),
          },
          {
            label: "Income",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
            hoverBorderColor: "rgba(75, 192, 192, 1)",
            data: listIncome.map((item) => item.total),
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [listExpense, listIncome, days]);

  return (
    <div className="w-full flex justify-center flex-col">
      <Link
        href={"/dashboard/details-diagram"}
        className="btn btn-link btn-sm text-prime m-auto mb-2"
      >
        Weekly Expenses and Income
      </Link>
      <canvas ref={chartContainer} className="w-full" />
    </div>
  );
};

export default BarChart;
