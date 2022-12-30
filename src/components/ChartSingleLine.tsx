import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export interface ChartData {
  values: number[];
  labels: string[];
  legendLabel: string;
}

export interface ChartConfig {
  scale: any;
}

type ChartSingleLineProps = { data: ChartData } & { config: ChartConfig };

function ChartSingleLine(props: ChartSingleLineProps) {
  const chartData = {
    labels: props.data.labels,
    datasets: [
      {
        label: props.data.legendLabel,
        data: props.data.values,
        backgroundColor: "rgba(234, 118, 150, 1)",
        borderColor: "rgba(234, 118, 150, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        pointRadius: 0.1,
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
            type: props.config.scale,
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
