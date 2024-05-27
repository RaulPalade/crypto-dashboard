import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";
import { ChartData } from "../../components/CustomChartJS";

function Bitcoin2YearMa() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin2YearMAChart, setBitcoin2YearMAChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin2YearMAx5Chart, setBitcoin2YearMAx5Chart] = useState<ChartData>(
    { values: [], labels: [], legendLabel: "" }
  );

  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

  const [viewingOption, setViewingOption] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    createChartDatasets(
      bitcoinPriceChart,
      bitcoin2YearMAChart,
      bitcoin2YearMAx5Chart
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
      const processedChartData2MA: ChartData = {
        values: calculateTwoYearMA(data.values),
        labels: data.labels,
        legendLabel: "2 Year MA",
      };

      const processedChartData2MAx5: ChartData = {
        values: calculateTwoYearMAx5(data.values),
        labels: data.labels,
        legendLabel: "2 Year MA x5",
      };
      setChartLabels(data.labels.slice(1000));
      setBitcoinPriceChart(data);
      setBitcoin2YearMAChart(processedChartData2MA);
      setBitcoin2YearMAx5Chart(processedChartData2MAx5);
      createChartDatasets(data, processedChartData2MA, processedChartData2MAx5);
    } catch (error) {
      console.log(error);
    }
  };

  function calculateTwoYearMA(prices: number[]) {
    return prices.reduce(
      (acc, curr, index) => {
        if (index < 0) {
          return [...acc, curr];
        }
        const sum = prices
          .slice(index - 729, index + 1)
          .reduce((a, b) => a + b, 0);
        return [...acc, sum / 729];
      },
      [0, 0]
    );
  }

  function calculateTwoYearMAx5(prices: number[]) {
    return prices.reduce(
      (acc, curr, index) => {
        if (index < 0) {
          return [...acc, curr];
        }
        const sum = prices
          .slice(index - 729, index + 1)
          .reduce((a, b) => a + b, 0);
        return [...acc, (sum / 729) * 5];
      },
      [0, 0]
    );
  }

  function createChartDatasets(
    data: ChartData,
    processedChartData2MA: ChartData,
    processedChartData2MAx5: ChartData
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
      label: processedChartData2MA.legendLabel,
      data: processedChartData2MA.values.slice(1000),
      backgroundColor: "rgba(41, 115, 115, 1)",
      borderColor: "rgba(41, 115, 115, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointRadius: 0,
    });

    datasets.push({
      label: processedChartData2MAx5.legendLabel,
      data: processedChartData2MAx5.values.slice(1000),
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
      <div className="home-content flex w-full flex-col">
        <div>
          <div className="space-y-6">
            <Header text="2-Year MA Multiplier" />
            <Description
              text={
                <>
                  The 2-Year MA Multiplier is a tool that helps with long-term
                  investment in Bitcoin. It shows periods when buying or selling
                  Bitcoin would have been a good idea based on past performance.
                  <br></br>
                  To do this, it uses a moving average line (MA) - in this case,
                  the 2-year MA - and also multiplies that line by 5. <br></br>
                  <br></br>
                  It's important to note that this multiplication is applied to
                  the price values, not the time period, of the 2-year MA. In
                  the past, buying Bitcoin when the price goes below the 2-year
                  MA (green line) has typically resulted in above-average
                  returns. On the other hand, selling Bitcoin when the price
                  goes above the multiplied 2-year MA (red line) has
                  historically been a good way to take profits.
                </>
              }
            />
          </div>
          <div className="mt-10">
            <ChartCard>
              <ChartNoDropdownsContainer
                type="line"
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

export default Bitcoin2YearMa;
