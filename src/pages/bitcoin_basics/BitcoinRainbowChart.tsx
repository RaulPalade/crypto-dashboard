import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";
import { ChartData } from "../../components/CustomChartJS";
import ChartOnlyScaleOptionContainer from "../../components/ChartOnlyScaleOptionContainer";

function BitcoinRainbowChart() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });

  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        1500,
        2
      );

      setChartLabels(data.labels.slice(1000));
      setBitcoinPriceChart(data);

      createChartDatasets(data);
    } catch (error) {
      console.log(error);
    }
  };

  function FibMidDevLine(prices: number[]): number[] {
    // Seleziona i punti estremi della trendline
    const highIntercept = 0.95;
    const lowIntercept = -2.9;

    const highSlope = 0.0009;
    const lowSlope = 0.0012;

    const dataset: number[] = [];

    for (let i = 0; i < prices.length; i++) {
      const timeIndex = i / prices.length;
      const highSlopeCum = highSlope * timeIndex;
      const weight =
        (Math.log10(timeIndex + 10) * timeIndex * timeIndex - timeIndex) /
        30000;
      const HighLogDev = Math.log(weight) + highIntercept + highSlopeCum;

      const LowSlopeCum = lowSlope * timeIndex;
      const LowLogDev = Math.log(weight) + lowIntercept + LowSlopeCum;

      const logRange = HighLogDev - LowLogDev;
      const fib618dev = logRange * 0.5 + LowLogDev;
      const y = fib618dev;

      dataset.push(y);
    }

    return dataset;
  }
  function Fib618DevLine(prices: number[]): number[] {
    // Seleziona i punti estremi della trendline
    const high = Math.max(...prices);
    const low = Math.min(...prices);

    // Calcola il punto medio
    const mid = (high + low) / 2;

    // Calcola il 618Dev
    const fib618dev = mid * 0.618;
    const dataset: number[] = [];
    const priceArray = bitcoinPriceChart.values.slice(1000);
    for (let i = 0; i < priceArray.length; i++) {
      const y =
        (1 - i / priceArray.length) * (1 - i / priceArray.length) * low +
        2 * (1 - i / priceArray.length) * (i / priceArray.length) * fib618dev +
        (i / priceArray.length) * (i / priceArray.length) * high * 0.7;

      dataset.push(y > low ? y : NaN);
    }

    return dataset;
  }

  function createChartDatasets(data: ChartData) {
    const datasets: ChartDataset[] = [];
    datasets.push({
      label: "BTC Price",
      data: data.values.slice(1000),
      backgroundColor: "rgba(30, 34, 45, 1)",
      borderColor: "rgba(30, 34, 45, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      showLine: true,
      pointRadius: 0,
    });

    datasets.push({
      label: "FibMidDev",
      data: FibMidDevLine(data.values.slice(1000)),
      backgroundColor: "rgba(255, 34, 45, 1)",
      borderColor: "rgba(255, 34, 45, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      showLine: true,
      pointRadius: 0,
    });
    datasets.push({
      label: "Fib618Dev",
      data: Fib618DevLine(data.values.slice(1000)),
      backgroundColor: "rgba(30, 34, 45, 1)",
      borderColor: "rgba(30, 34, 45, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      showLine: true,
      pointRadius: 0,
    });

    setChartDatasets(datasets);
  }
  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="Bitcoin Rainbow Chart" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
            <Description
              text={
                <>
                  The Pi Cycle Top Indicator has a track record of predicting
                  the timing of market cycle highs with a margin of error of
                  only 3 days.<br></br>It relies on the 111 day moving average
                  and a new metric based on the 350 day moving average, called
                  the 350DMA x 2.<br></br>
                  <br></br>It's worth noting that the multiple refers to the
                  price values of the 350DMA, not the number of days. In the
                  past three market cycles, when the 111DMA moves up and crosses
                  the 350DMA x 2, it has coincided with the peak of Bitcoin's
                  price. It's interesting to note that the ratio of 350 to 111
                  is approximately equal to Pi, which is 3.142. This further
                  highlights the cyclical nature of Bitcoin's price action over
                  long periods of time, and in this case, the indicator has been
                  highly accurate over the past 7 years.
                  <br></br>
                  <br></br>The Pi Cycle Top Indicator is useful for identifying
                  when the market is extremely overheated, as indicated by the
                  111 day moving average reaching a multiple of 2 of the 350 day
                  moving average.<br></br>Historically, it has been beneficial
                  to sell Bitcoin at this point in the price cycle.
                </>
              }
            />
          </div>
          <div className="lg:flex-grow-3 mt-5 lg:ml-6 lg:mt-0 lg:w-2/3">
            <ChartCard>
              <ChartOnlyScaleOptionContainer
                type="line"
                labels={chartLabels}
                datasets={chartDatasets}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitcoinRainbowChart;
