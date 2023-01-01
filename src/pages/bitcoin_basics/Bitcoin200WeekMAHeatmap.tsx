import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";
import { ChartData } from "../../components/CustomChartJS";
import ChartOnlyScaleOptionContainer from "../../components/ChartOnlyScaleOptionContainer";

function Bitcoin200WeekMAHeatmap() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin200WeekMAChart, setBitcoin200WeekMAChart] = useState<ChartData>(
    {
      values: [],
      labels: [],
      legendLabel: "",
    }
  );
  const [monthlyIncreaseDataset, setMonthlyIncreaseDataset] = useState<
    number[]
  >([]);

  const [colorsDataset, setColorsDataset] = useState<string[]>([]);
  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        1300,
        3
      );
      setChartLabels(data.labels.slice(1400));
      const processedChartData200WeekMA: ChartData = {
        values: calculate200WeekMA(data.values),
        labels: data.labels,
        legendLabel: "200 Week MA",
      };
      const monthlyIncreaseDataset = [];
      const monthlyIncrease: number[] = [];
      const MA_200_data = processedChartData200WeekMA.values.slice(1400);

      for (let i = 0; i < MA_200_data.length - 30; i += 30) {
        const increment =
          ((MA_200_data[i + 30] - MA_200_data[i]) / MA_200_data[i]) * 100;

        for (let i = 0; i < 29; i++) {
          monthlyIncreaseDataset.push(NaN);
          monthlyIncrease.push(NaN);
        }
        monthlyIncreaseDataset.push(data.values.slice(1400)[i + 29]);
        monthlyIncrease.push(increment);
      }
      const colors = monthlyIncrease.map((increment) => {
        if (increment > 16) {
          return "rgba(220, 0, 0, 1)";
        } else if (increment > 13) {
          return "rgba(255, 125, 0, 1)";
        } else if (increment > 10) {
          return "rgba(255, 212, 0, 1)";
        } else if (increment > 7) {
          return "rgba(82, 170, 138, 1)";
        } else if (increment > 2) {
          return "rgba(3, 64, 120, 2)";
        } else {
          return "rgba(122, 48, 108, 1)";
        }
      });
      setBitcoinPriceChart(data);
      setBitcoin200WeekMAChart(processedChartData200WeekMA);
      setMonthlyIncreaseDataset(monthlyIncreaseDataset);
      setColorsDataset(colors);

      const customMonthlyIncreaseDataset = monthlyIncreaseDataset.map(
        (montlyIncreaseValue: number, index: number) => {
          return {
            customDataset: {
              xAxis: data.labels.slice(1400)[index],
              yAxis: montlyIncreaseValue,
              label: `Monthly Increase Of 200W MA: ${monthlyIncrease[
                index
              ].toFixed(0)}%`,
            },
          };
        }
      );
      createChartDatasets(
        data,
        processedChartData200WeekMA,
        customMonthlyIncreaseDataset,
        colors
      );
    } catch (error) {
      console.log(error);
    }
  };

  function calculate200WeekMA(prices: number[]) {
    return prices.reduce(
      (acc, curr, index) => {
        if (index < 0) {
          return [...acc, curr];
        }
        const sum = prices
          .slice(index - 1399, index + 1)
          .reduce((a, b) => a + b, 0);
        return [...acc, sum / 1399];
      },
      [0, 0]
    );
  }

  function createChartDatasets(
    data: ChartData,
    processedChartData200WeekMA: ChartData,
    monthlyIncreaseDataset: any[],
    colors: string[]
  ) {
    const datasets: any[] = [];
    datasets.push({
      label: "BTC Price",
      data: data.values.slice(1400),
      backgroundColor: "rgba(30, 34, 45, 1)",
      borderColor: "rgba(30, 34, 45, 1)",
      borderWidth: 1,
      showLine: true,
      pointRadius: 3,
      pointBorderColor: "rgba(0, 0, 0, 0)",
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
    });

    datasets.push({
      label: processedChartData200WeekMA.legendLabel,
      data: processedChartData200WeekMA.values.slice(1400),
      backgroundColor: "rgba(41, 115, 115, 1)",
      borderColor: "rgba(41, 115, 115, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointRadius: 0,
    });

    datasets.push({
      label: "% Monthly Increase Of 200 Week MA",
      data: monthlyIncreaseDataset,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
      showLines: false,
      pointBackgroundColor: colors,
      pointRadius: 3,
    });

    setChartDatasets(datasets);
  }

  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="200 Week Moving Average Heatmap" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
            <Description
              text={
                <>
                  During its major market cycles, the price of Bitcoin tends to
                  reach a low point around the 200 week moving average. This
                  indicator uses a color heatmap based on the percentage
                  increases of that 200 week moving average.<br></br>
                  <br></br>The color assigned to the price chart changes each
                  month based on the percentage increase of the 200 week moving
                  average. Long term Bitcoin investors can monitor these monthly
                  color changes to determine the best times to buy or sell.
                  <br></br>In the past, when the price chart has displayed
                  orange and red dots, it has typically been a good time to sell
                  due to an overheated market. On the other hand, periods when
                  the price dots are purple and close to the 200 week moving
                  average have often been good times to buy. The 200WMA heatmap
                  can be a useful tool for predicting the future price of
                  Bitcoin or forecasting where it may go. It shows whether the
                  current price is overextending and may need to cool down, as
                  well as when the price of Bitcoin may be a good value based on
                  its history. <br></br>
                  <br></br>Over the past ten years, $BTC has rarely fallen below
                  the 200 week moving average (200WMA), which is also worth
                  considering when making price predictions or forecasts for
                  Bitcoin.
                </>
              }
            />
          </div>
          <div className="lg:flex-grow-3 mt-5 lg:ml-6 lg:mt-0 lg:w-2/3">
            <ChartCard>
              <ChartOnlyScaleOptionContainer
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

export default Bitcoin200WeekMAHeatmap;
