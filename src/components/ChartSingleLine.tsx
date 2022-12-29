import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export interface ChartData {
  values: number[];
  labels: string[];
  legendLabel: string;
}

function ChartSingleLine(data: ChartData) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.legendLabel,
        data: data.values,
        backgroundColor: "rgba(234, 118, 150, 1)",
        borderColor: "rgba(234, 118, 150, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        pointRadius: 2,
      },
    ],
  };
  return (
    <Chart
      type="line"
      data={chartData}
      options={{
        plugins: { legend: { display: true } },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
          },

          y: {
            display: true,
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}

export default ChartSingleLine;
