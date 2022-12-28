import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export interface ChartData {
  values: number[];
  labels: string[];
}

function CustomChart(data: ChartData) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: "rgba(81, 74, 248, 1)",
        borderColor: "rgba(81, 74, 248, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        pointRadius: 0,
        lineTension: 0,
      },
    ],
  };
  return (
    <Chart
      type="line"
      data={chartData}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },

          y: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}

export default CustomChart;
