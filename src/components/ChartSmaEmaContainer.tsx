import { useState } from "react";
import ChartSingleLine from "./ChartSingleLine";
import { ChartData } from "./ChartSingleLine";

function ChartSmaEmaContainer(data: ChartData) {
  const [viewOption, setViewOption] = useState(0);
  const [scaleOption, setScaleOption] = useState(0);

  const filterSMA = (sma: string) => {
    console.log(sma);
  };

  const filterEMA = (ema: string) => {
    console.log(ema);
  };

  return (
    <>
      <div id="viewing-option">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Viewing Option
        </label>

        <div
          className="inline-flex flex-col rounded-md shadow-sm md:flex-row"
          role="group">
          <button
            type="button"
            onClick={() => setViewOption(0)}
            className={`focus:ring-blue-70 rounded-t-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100  ease-in-out md:rounded-l-lg md:rounded-r-none ${
              viewOption === 0 ? "bg-lightViolet text-white" : ""
            }`}>
            Color Coded
          </button>
          <button
            type="button"
            onClick={() => setViewOption(1)}
            className={`border-t border-b border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out ${
              viewOption === 1 ? "bg-lightViolet text-white" : ""
            }`}>
            Raw Values
          </button>
          <button
            type="button"
            onClick={() => setViewOption(2)}
            className={`rounded-b-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out md:rounded-r-md md:rounded-l-none ${
              viewOption === 2 ? "bg-lightViolet text-white  " : ""
            }`}>
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
          role="group">
          <button
            onClick={() => setScaleOption(0)}
            type="button"
            className={`rounded-t-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out md:rounded-l-lg md:rounded-r-none ${
              scaleOption === 0 ? "bg-lightViolet text-white" : ""
            }`}>
            Linear
          </button>
          <button
            onClick={() => setScaleOption(1)}
            type="button"
            className={`rounded-b-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium transition delay-100 ease-in-out md:rounded-r-md md:rounded-l-none ${
              scaleOption === 1 ? "bg-lightViolet text-white" : ""
            }`}>
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
              id="countries"
              onChange={(e) => filterSMA(e.target.value)}
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500">
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
              id="countries"
              onChange={(e) => filterEMA(e.target.value)}
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500">
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
      <ChartSingleLine {...data} />
    </>
  );
}

export default ChartSmaEmaContainer;
