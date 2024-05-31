import { useEffect, useState } from "react";
import { ChartDataset } from "chart.js";
import CustomChartJS from "./CustomChartJS";
import chartAnimation from "../assets/lottie/chartAnimation.json";
import Lottie from "react-lottie";

type ChartOnlyScaleOptionContainerProps = { type: any } & {
  labels: string[];
} & {
  datasets: any[];
} & { annotations?: any[] };
function ChartOnlyScaleOptionContainer(
  props: ChartOnlyScaleOptionContainerProps
) {
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
        <CustomChartJS
          labels={chartLabels}
          datasets={chartDatasets}
          config={{
            type: props.type,
            scale: scaleOption === 0 ? "linear" : "logarithmic",
            annotations: props.annotations,
          }}
        />
      </div>
    </>
  );
}

export default ChartOnlyScaleOptionContainer;
