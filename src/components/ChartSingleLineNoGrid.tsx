import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(zoomPlugin);
export interface ChartData {
  values: number[];
  labels: string[];
  legendLabel: string;
}

export interface ChartConfig {
  scale: any;
}

type ChartSingleLineProps = { data: ChartData } & { config: ChartConfig };
const numberOfYearToShow = 16;

function ChartSingleLineNoGrid(props: ChartSingleLineProps) {
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

export default ChartSingleLineNoGrid;
