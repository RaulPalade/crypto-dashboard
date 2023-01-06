import { useEffect, useState } from "react";
import { Chart, ChartDataset } from "chart.js";
import CustomChartJS from "./CustomChartJS";

type ChartNoDropdownsContainerProps = { type: any } & { labels: string[] } & {
  datasets: ChartDataset[];
} & { viewingOptionCallback: (value: number) => void };
function ChartNoDropdownsContainer(props: ChartNoDropdownsContainerProps) {
  const [viewOption, setViewOption] = useState(0);
  const [scaleOption, setScaleOption] = useState(1);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

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
            onClick={() => {
              setViewOption(0);
              props.viewingOptionCallback(0);
            }}
            className={`focus:ring-blue-70 delay-50 rounded-t-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition  ease-in-out md:rounded-l-lg md:rounded-r-none ${
              viewOption === 0 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Line
          </button>
          <button
            type="button"
            onClick={() => {
              setViewOption(1);
              props.viewingOptionCallback(1);
            }}
            className={`delay-50 border-t border-b border-gray-200 bg-white py-2 px-3 text-sm font-medium transition ease-in-out ${
              viewOption === 1 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Points
          </button>
          <button
            type="button"
            onClick={() => {
              setViewOption(2);
              props.viewingOptionCallback(2);
            }}
            className={`delay-50 rounded-b-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition ease-in-out md:rounded-r-md md:rounded-l-none ${
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
          type: props.type,
          scale: scaleOption === 0 ? "linear" : "logarithmic",
        }}
      />
    </>
  );
}

export default ChartNoDropdownsContainer;
