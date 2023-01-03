import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";
import { ChartData } from "../../components/CustomChartJS";

function BitcoinPiCycleTop() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin111DMAChart, setBitcoin111DMAChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin350DMAx2Chart, setBitcoin350DMAx2Chart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });

  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

  const [viewingOption, setViewingOption] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    createChartDatasets(
      bitcoinPriceChart,
      bitcoin111DMAChart,
      bitcoin350DMAx2Chart
    );
  }, [viewingOption]);

  function onViewingOptionChanged(value: number) {
    setViewingOption(value);
  }

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        1500,
        2
      );
      const processedChartData111DMA: ChartData = {
        values: calculate111DMA(data.values),
        labels: data.labels,
        legendLabel: "Price 111DMA",
      };

      const processedChartData350DMAx2: ChartData = {
        values: calculate350DMAx2(data.values),
        labels: data.labels,
        legendLabel: "Price 350DMA x2",
      };
      setChartLabels(data.labels.slice(1000));
      setBitcoinPriceChart(data);
      setBitcoin111DMAChart(processedChartData111DMA);
      setBitcoin350DMAx2Chart(processedChartData350DMAx2);
      createChartDatasets(
        data,
        processedChartData111DMA,
        processedChartData350DMAx2
      );
    } catch (error) {
      console.log(error);
    }
  };

  function calculate111DMA(prices: number[]) {
    return prices.reduce(
      (acc, curr, index) => {
        if (index < 0) {
          return [...acc, curr];
        }
        const sum = prices
          .slice(index - 111, index + 1)
          .reduce((a, b) => a + b, 0);
        return [...acc, sum / 111];
      },
      [0, 0]
    );
  }

  function calculate350DMAx2(prices: number[]) {
    return prices.reduce(
      (acc, curr, index) => {
        if (index < 0) {
          return [...acc, curr];
        }
        const sum = prices
          .slice(index - 350, index + 1)
          .reduce((a, b) => a + b, 0);
        return [...acc, (sum / 350) * 2];
      },
      [0, 0]
    );
  }

  function createChartDatasets(
    data: ChartData,
    processedChartData111DMA: ChartData,
    processedChartData350DMAx2: ChartData
  ) {
    const datasets: ChartDataset[] = [];
    datasets.push({
      label: "BTC Price",
      data: data.values.slice(1000),
      backgroundColor: "rgba(30, 34, 45, 1)",
      borderColor: "rgba(30, 34, 45, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      showLine: viewingOption === 0 || viewingOption === 2,
      pointRadius: viewingOption === 1 || viewingOption === 2 ? 1.5 : 0,
    });

    datasets.push({
      label: processedChartData111DMA.legendLabel,
      data: processedChartData111DMA.values.slice(1000),
      backgroundColor: "rgba(41, 115, 115, 1)",
      borderColor: "rgba(41, 115, 115, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointRadius: 0,
    });

    datasets.push({
      label: processedChartData350DMAx2.legendLabel,
      data: processedChartData350DMAx2.values.slice(1000),
      backgroundColor: "rgba(220, 0, 0, 1)",
      borderColor: "rgba(220, 0, 0, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointRadius: 0,
    });

    setChartDatasets(datasets);
  }
  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="Pi Cycle Top Indicator" />
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
              <ChartNoDropdownsContainer
                labels={chartLabels}
                datasets={chartDatasets}
                viewingOptionCallback={onViewingOptionChanged}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitcoinPiCycleTop;
