import { useEffect, useState } from "react";
import ChartSingleLine, { ChartConfig } from "./ChartSingleLine";
import { ChartData } from "./ChartSingleLine";

function ChartSmaEmaContainer(data: ChartData) {
  const [viewOption, setViewOption] = useState(0);
  const [scaleOption, setScaleOption] = useState(0);
  const [chartData, setChartData] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    scale: "linear",
  });

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const filterSMA = (smaPeriod: number) => {
    // Reset the other dropdown
    const select = document.getElementById("emaDropdown") as HTMLSelectElement;
    if (select != null) {
      select.value = "None";
    }
    if (isNaN(smaPeriod)) {
      console.log("isNan");
      setChartData(data);
      return;
    }
    const smaData: number[] = [];

    for (let i = 0; i < data.values.length; i++) {
      let sum = 0;

      // Calculate the sum of prices for the previous 30 periods
      for (let j = i - smaPeriod - 1; j <= i; j++) {
        if (j >= 0) {
          sum += data.values[j];
        }
      }

      // Calculate the average of prices for the previous 30 periods
      const average = sum / smaPeriod;
      smaData.push(average);
    }

    const updatedChartData: ChartData = {
      values: smaData,
      labels: data.labels,
      legendLabel: data.legendLabel,
    };
    setChartData(updatedChartData);
  };

  const filterEMA = (emaPeriod: number) => {
    // Reset the other dropdown
    const select = document.getElementById("smaDropdown") as HTMLSelectElement;
    if (select != null) {
      select.value = "None";
    }
    if (isNaN(emaPeriod)) {
      console.log("isNan");
      setChartData(data);
      return;
    }
    const emaData: number[] = [];

    // Calculate the smoothing coefficient
    const k = 2 / (emaPeriod + 1);

    for (let i = 0; i < data.values.length; i++) {
      let ema;

      if (i === 0) {
        // If it is the first period, the EMA is equal to the price
        ema = data.values[i];
      } else {
        // Otherwise, calculate the EMA using the above formula
        ema = data.values[i] * k + emaData[i - 1] * (1 - k);
      }

      emaData.push(ema);
    }

    const updatedChartData: ChartData = {
      values: emaData,
      labels: data.labels,
      legendLabel: data.legendLabel,
    };
    setChartData(updatedChartData);
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
      <div className="flex flex-col items-center justify-center space-y-2 text-center md:flex-row md:space-y-0 md:space-x-4">
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

      <ChartSingleLine data={chartData} config={chartConfig} />
    </>
  );
}

export default ChartSmaEmaContainer;
