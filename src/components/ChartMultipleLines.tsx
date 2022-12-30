import "chart.js/auto";
import { ChartDataset } from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartConfig, ChartData } from "./ChartSingleLine";

type ChartMultipleLines = { labels: string[] } & {
  datasets: ChartDataset[];
} & {
  config: ChartConfig;
};
const numberOfYearToShow = 16;

function ChartMultipleLines(props: ChartMultipleLines) {
  const chartData = {
    labels: props.labels,
    datasets: props.datasets,
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
            ticks: {
              autoSkip: true,
              maxTicksLimit: numberOfYearToShow,
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

export default ChartMultipleLines;
