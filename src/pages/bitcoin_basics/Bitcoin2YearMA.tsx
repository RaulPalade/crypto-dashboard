import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import ChartSmaEmaContainer from "../../components/ChartSmaEmaContainer";
import Description from "../../components/Description";
import Header from "../../components/Header";
import { ChartData } from "../../components/ChartSingleLineNoGrid";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";

function Bitcoin2YearMa() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

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
      const processedChartData2MA: ChartData = {
        values: calculateTwoYearMA(data.values),
        labels: data.labels,
        legendLabel: "2 YEAR MA",
      };

      const processedChartData2MAx5: ChartData = {
        values: calculateTwoYearMAx5(data.values),
        labels: data.labels,
        legendLabel: "2 YEAR MA X 5",
      };

      const datasets: ChartDataset[] = [];
      datasets.push({
        label: "BTC PRICE",
        data: data.values.slice(1000),
        backgroundColor: "rgba(30, 34, 45, 1)",
        borderColor: "rgba(30, 34, 45, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        pointRadius: 0.1,
      });

      datasets.push({
        label: processedChartData2MA.legendLabel,
        data: processedChartData2MA.values.slice(1000),
        backgroundColor: "rgba(41, 115, 115, 1)",
        borderColor: "rgba(41, 115, 115, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        pointRadius: 0.1,
      });

      datasets.push({
        label: processedChartData2MAx5.legendLabel,
        data: processedChartData2MAx5.values.slice(1000),
        backgroundColor: "rgba(220, 0, 0, 1)",
        borderColor: "rgba(220, 0, 0, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        pointRadius: 0.1,
      });

      setChartDatasets(datasets);
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
  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="2-Year MA Multiplier" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
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
          <div className="lg:flex-grow-3 mt-5 lg:ml-6 lg:mt-0 lg:w-2/3">
            <ChartCard>
              <ChartNoDropdownsContainer
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

export default Bitcoin2YearMa;
