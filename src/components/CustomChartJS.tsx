import "chart.js/auto";
import { ChartDataset, Chart as ChartJS } from "chart.js";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(zoomPlugin);
ChartJS.register(annotationPlugin);

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
  annotations?: any[];
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
                if (props.config.type === "pie") {
                  return t.formattedValue;
                }
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
                enabled: props.config.type !== "pie",
                speed: 0.1,
              },
              drag: {
                enabled: props.config.type !== "pie",
              },
              pinch: {
                enabled: props.config.type !== "pie",
              },
              mode: "xy",
            },
          },
          legend: { display: true },

          annotation: {
            annotations: props.config.annotations || [],
          },
        },
        scales: {
          x: {
            display: props.config.type !== "pie",
            grid: {
              display: props.config.type !== "pie",
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: numberOfYearToShow,
            },
          },

          y: {
            display: props.config.type !== "pie",
            type: props.config.scale,
            grid: {
              display: props.config.type !== "pie",
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
        },
      }}
    />
  );
}

export default CustomChartJS;
