import { ChartDataset } from "chart.js";
import { useEffect, useState } from "react";
import CustomChartJS from "./CustomChartJS";
import chartAnimation from "../assets/lottie/chartAnimation.json";
import Lottie from "react-lottie";

type ChartSmaEmaContainerProps = { type: any } & { labels: string[] } & {
  datasets: ChartDataset[];
} & { viewingOptionCallback: (value: number) => void };
function ChartSmaEmaContainer(props: ChartSmaEmaContainerProps) {
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

  const filterSMA = (smaPeriod: number) => {
    // Reset the other dropdown
    const select = document.getElementById("emaDropdown") as HTMLSelectElement;
    if (select != null) {
      select.value = "None";
    }
    if (isNaN(smaPeriod)) {
      console.log("isNan");
      setChartDatasets([props.datasets[0]]);
      return;
    }
    const smaData: number[] = [];

    for (let i = 0; i < props.datasets[0].data.length; i++) {
      let sum = 0;

      // Calculate the sum of prices for the previous 30 periods
      for (let j = i - smaPeriod - 1; j <= i; j++) {
        if (j >= 0) {
          sum += props.datasets[0].data[j] as number;
        }
      }

      // Calculate the average of prices for the previous 30 periods
      const average = sum / smaPeriod;
      smaData.push(average);
    }

    setChartDatasets([{ ...chartDatasets[0], data: smaData }]);
  };

  const filterEMA = (emaPeriod: number) => {
    // Reset the other dropdown
    const select = document.getElementById("smaDropdown") as HTMLSelectElement;
    if (select != null) {
      select.value = "None";
    }
    if (isNaN(emaPeriod)) {
      console.log("isNan");
      setChartDatasets([props.datasets[0]]);
      return;
    }
    const emaData: number[] = [];

    // Calculate the smoothing coefficient
    const k = 2 / (emaPeriod + 1);

    for (let i = 0; i < props.datasets[0].data.length; i++) {
      let ema;

      if (i === 0) {
        // If it is the first period, the EMA is equal to the price
        ema = props.datasets[0].data[i];
      } else {
        // Otherwise, calculate the EMA using the above formula
        ema =
          (props.datasets[0].data[i] as number) * k + emaData[i - 1] * (1 - k);
      }

      emaData.push(ema as number);
    }

    setChartDatasets([{ ...chartDatasets[0], data: emaData }]);
  };

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
            className={`focus:ring-blue-70 rounded-t-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium transition delay-100  ease-in-out md:rounded-l-lg md:rounded-r-none ${
              viewOption === 0 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Color Coded
          </button>
          <button
            type="button"
            onClick={() => setViewOption(1)}
            className={`border-b border-t border-gray-200 bg-white px-3 py-2 text-sm font-medium transition delay-100 ease-in-out ${
              viewOption === 1 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Raw Values
          </button>
          <button
            type="button"
            onClick={() => setViewOption(2)}
            className={`rounded-b-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium transition delay-100 ease-in-out md:rounded-l-none md:rounded-r-md ${
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
            className={`rounded-t-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium transition delay-100 ease-in-out md:rounded-l-lg md:rounded-r-none ${
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
            className={`rounded-b-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium transition delay-100 ease-in-out md:rounded-l-none md:rounded-r-md ${
              scaleOption === 1 ? "bg-lightViolet text-white" : ""
            }`}
          >
            Logarithm
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 text-center md:flex-row md:space-x-4 md:space-y-0">
        <div className="sma-list">
          <div className="flex flex-col items-center">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              SMA
            </label>
            <select
              id="smaDropdown"
              onChange={(e) => filterSMA(parseInt(e.target.value, 10))}
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option defaultValue={"None"}>None</option>
              <option>7</option>
              <option>14</option>
              <option>30</option>
              <option>50</option>
              <option>90</option>
            </select>
          </div>
        </div>
        <div className="ema-list">
          <div className="flex flex-col items-center">
            <label className="mb-2 block w-fit text-sm font-medium text-gray-900">
              EMA
            </label>
            <select
              id="emaDropdown"
              onChange={(e) => filterEMA(parseInt(e.target.value, 10))}
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option defaultValue={"None"}>None</option>
              <option>7</option>
              <option>14</option>
              <option>30</option>
              <option>50</option>
              <option>90</option>
            </select>
          </div>
        </div>
      </div>

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

export default ChartSmaEmaContainer;
