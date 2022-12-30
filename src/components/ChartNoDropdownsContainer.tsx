import { useEffect, useState } from "react";
import ChartDoubleLine from "./ChartMultipleLines";
import { ChartConfig } from "./ChartSingleLineNoGrid";
import { ChartData } from "./ChartSingleLineNoGrid";
import { Chart, ChartDataset } from "chart.js";

type ChartNoDropdownsContainerProps = { labels: string[] } & {
  datasets: ChartDataset[];
};
function ChartNoDropdownsContainer(props: ChartNoDropdownsContainerProps) {
  const [viewOption, setViewOption] = useState(0);
  const [scaleOption, setScaleOption] = useState(0);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    scale: "linear",
  });

  useEffect(() => {
    setChartLabels(props.labels);
    setChartDatasets(props.datasets);
  }, [props.labels, props.datasets]);

  return (
    <>
      <div id="viewing-option">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Viewing Option
        </label>

        <div
          className="inline-flex flex-col rounded-md shadow-sm md:flex-row"
          role="group"
        >
          <button
            type="button"
            onClick={() => setViewOption(0)}
            className={`focus:ring-blue-70 rounded-t-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100  ease-in-out md:rounded-l-lg md:rounded-r-none ${
              viewOption === 0 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Color Coded
          </button>
          <button
            type="button"
            onClick={() => setViewOption(1)}
            className={`border-t border-b border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out ${
              viewOption === 1 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Raw Values
          </button>
          <button
            type="button"
            onClick={() => setViewOption(2)}
            className={`rounded-b-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out md:rounded-r-md md:rounded-l-none ${
              viewOption === 2 ? "bg-lightViolet text-white  " : ""
            }`}
          >
            Both
          </button>
        </div>
      </div>
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
              setChartConfig({ scale: "linear" });
            }}
            type="button"
            className={`rounded-t-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out md:rounded-l-lg md:rounded-r-none ${
              scaleOption === 0 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Linear
          </button>
          <button
            onClick={() => {
              setScaleOption(1);
              setChartConfig({ scale: "logarithmic" });
            }}
            type="button"
            className={`rounded-b-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out md:rounded-r-md md:rounded-l-none ${
              scaleOption === 1 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Logarithm
          </button>
        </div>
      </div>
      <div></div>
      <ChartDoubleLine
        labels={chartLabels}
        datasets={chartDatasets}
        config={chartConfig}
      />
    </>
  );
}

export default ChartNoDropdownsContainer;
