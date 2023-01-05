import { useEffect, useState } from "react";
import { Chart, ChartDataset } from "chart.js";
import CustomChartJS from "./CustomChartJS";

type ChartOnlyScaleOptionContainerProps = { labels: string[] } & {
  datasets: any[];
};
function ChartOnlyScaleOptionContainer(
  props: ChartOnlyScaleOptionContainerProps
) {
  const [scaleOption, setScaleOption] = useState(1);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

  useEffect(() => {
    setChartLabels(props.labels);
    setChartDatasets(props.datasets);
  }, [props.labels, props.datasets]);

  return (
    <>
      <div></div>
      <div id="price-scale">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Price Scale
        </label>
        <div
          className="inline-flex flex-col rounded-md shadow-sm md:flex-row"
          role="group"
        >
          <button
            onClick={() => {
              setScaleOption(0);
            }}
            type="button"
            className={`delay-50 rounded-t-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition ease-in-out md:rounded-l-lg md:rounded-r-none ${
              scaleOption === 0 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Linear
          </button>
          <button
            onClick={() => {
              setScaleOption(1);
            }}
            type="button"
            className={`delay-50 rounded-b-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition ease-in-out md:rounded-r-md md:rounded-l-none ${
              scaleOption === 1 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Logarithm
          </button>
        </div>
      </div>
      <div></div>
      <CustomChartJS
        labels={chartLabels}
        datasets={chartDatasets}
        config={{
          scale: scaleOption === 0 ? "linear" : "logarithmic",
        }}
      />
    </>
  );
}

export default ChartOnlyScaleOptionContainer;
