import "chart.js/auto";
import { ChartDataset, Chart as ChartJS } from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartConfig } from "./ChartSingleLineNoGrid";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(zoomPlugin);

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
        responsive: true,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.1,
              },
              drag: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
          legend: { display: true },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: true,
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
              display: true,
            },
          },
        },
      }}
    />
  );
}

export default ChartMultipleLines;
