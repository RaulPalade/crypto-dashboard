import "chart.js/auto";
import { ChartDataset, Chart as ChartJS } from "chart.js";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { type } from "os";

ChartJS.register(zoomPlugin);

type ChartMultipleLines = { labels: string[] } & {
  datasets: ChartDataset[];
} & {
  config: ChartConfig;
};
export interface ChartData {
  values: number[];
  labels: string[];
  legendLabel: string;
}

export interface ChartConfig {
  type: any;
  scale: any;
}
const numberOfYearToShow = 16;

function CustomChartJS(props: ChartMultipleLines) {
  const chartData = {
    labels: props.labels,
    datasets: props.datasets,
  };
  return (
    <Chart
      type={props.config.type}
      data={chartData}
      options={{
        parsing: {
          xAxisKey: "customDataset.xAxis",
          yAxisKey: "customDataset.yAxis",
        },
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (t: any) {
                console.log(t);
                if (t.raw.customDataset === undefined) {
                  return `${t.dataset.label}: $${t.formattedValue}`;
                }
                return `${t.raw.customDataset.label}`; // return a string that you wish to append
              },
            },
          },
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
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
            min: 0,
            max:
              Math.max(
                ...props.datasets.map((dataset) =>
                  Math.max(...(dataset.data as number[]))
                )
              ) +
              Math.max(
                ...props.datasets.map((dataset) =>
                  Math.max(...(dataset.data as number[]))
                )
              ) *
                0.2,
          },
        },
      }}
    />
  );
}

export default CustomChartJS;
