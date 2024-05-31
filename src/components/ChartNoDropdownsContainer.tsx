import { useEffect, useState } from "react";
import { ChartDataset } from "chart.js";
import CustomChartJS from "./CustomChartJS";
import chartAnimation from "../assets/lottie/chartAnimation.json";
import Lottie from "react-lottie";

type ChartNoDropdownsContainerProps = { type: any } & { labels: string[] } & {
  doubleYAxis?: boolean;
} & {
  datasets: ChartDataset[];
} & { viewingOptionCallback: (value: number) => void };
function ChartNoDropdownsContainer(props: ChartNoDropdownsContainerProps) {
  const [viewOption, setViewOption] = useState(0);
  const [scaleOption, setScaleOption] = useState(1);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);
  const [chartLoading, setChartLoading] = useState<boolean>(true);

  useEffect(() => {
    setChartLabels(props.labels);
    setChartDatasets(props.datasets);
    setTimeout(() => {
      setChartLoading(false);
    }, 1000);
  }, [props.labels, props.datasets]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chartAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (chartLoading) {
    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
        <p className="text-2xl font-bold text-violet-950">Loading Chart...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-6 align-middle">
        <div id="viewing-option">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Viewing Option
          </label>

          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => {
                setViewOption(0);
                props.viewingOptionCallback(0);
              }}
              className={`focus:ring-blue-70 delay-50 rounded-t-lg border border-gray-200 px-3 py-2 text-sm font-medium transition ease-in-out md:rounded-l-lg md:rounded-r-none ${
                viewOption === 0
                  ? "bg-lightViolet text-white"
                  : "bg-white text-black"
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
              className={`delay-50 border-b border-t border-gray-200 px-3 py-2 text-sm font-medium transition ease-in-out ${
                viewOption === 1
                  ? "bg-lightViolet text-white"
                  : "bg-white text-black"
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
              className={`delay-50 rounded-b-lg border border-gray-200 px-3 py-2 text-sm font-medium transition ease-in-out md:rounded-l-none md:rounded-r-md ${
                viewOption === 2
                  ? "bg-lightViolet text-white"
                  : "bg-white text-black"
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
              className={`delay-50 rounded-t-lg border border-gray-200 px-3 py-2 text-sm font-medium transition ease-in-out md:rounded-l-lg md:rounded-r-none ${
                scaleOption === 0
                  ? "bg-lightViolet text-white"
                  : "bg-white text-black"
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => {
                setScaleOption(1);
              }}
              type="button"
              className={`delay-50 rounded-b-lg border border-gray-200 px-3 py-2 text-sm font-medium transition ease-in-out md:rounded-l-none md:rounded-r-md ${
                scaleOption === 1
                  ? "bg-lightViolet text-white"
                  : "bg-white text-black"
              }`}
            >
              Logarithm
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div>
          <CustomChartJS
            labels={chartLabels}
            datasets={chartDatasets}
            config={{
              type: props.type,
              scale: scaleOption === 0 ? "linear" : "logarithmic",
              doubleYAxis: props.doubleYAxis,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ChartNoDropdownsContainer;
