import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import { ChartData } from "../../components/CustomChartJS";
import AlternativeMeApi from "../../api/AlternativeMeApi";
import ChartOnlyScaleOptionContainer from "../../components/ChartOnlyScaleOptionContainer";

function BitcoinFearAndGreedIndex() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoinFearAndGreedData, setBitcoinFearAndGreedData] =
    useState<ChartData>({
      values: [],
      labels: [],
      legendLabel: "",
    });

  const [chartDatasets, setChartDatasets] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var bitcoinPriceData: ChartData =
        await CryptoCompareApi.getDailyPairOHLCV("BTC", "USD", 1500, 2);
      var fearAndGreedData: ChartData =
        await AlternativeMeApi.getFearAndGreedIndex(4500);
      fearAndGreedData = {
        ...fearAndGreedData,
        values: fearAndGreedData.values.reverse(),
        labels: fearAndGreedData.labels.reverse(),
      };
      bitcoinPriceData = {
        ...bitcoinPriceData,
        values: bitcoinPriceData.values.slice(-fearAndGreedData.values.length),
        labels: bitcoinPriceData.labels.slice(-fearAndGreedData.values.length),
      };
      setChartLabels(bitcoinPriceData.labels);
      setBitcoinPriceChart(bitcoinPriceData);
      setBitcoinFearAndGreedData(fearAndGreedData);

      const colors = fearAndGreedData.values.map((value) => {
        if (value > 90) {
          return "rgba(55, 146, 55, 1)";
        } else if (value > 70) {
          return "rgba(130, 205, 71, 1)";
        } else if (value > 50) {
          return "rgba(240, 255, 66, 1)";
        } else if (value > 25) {
          return "rgba(245, 115, 40, 1)";
        } else {
          return "rgba(255, 30, 0, 1)";
        }
      });
      createChartDatasets(bitcoinPriceData, fearAndGreedData, colors);
    } catch (error) {
      console.log(error);
    }
  };

  function createChartDatasets(
    bitcoinPriceData: ChartData,
    bitcoinFearAndGreedData: ChartData,
    colors: string[]
  ) {
    const customFearAndGreedDataset = bitcoinFearAndGreedData.values.map(
      (fearAndGreedValue, index) => {
        return {
          customDataset: {
            xAxis: bitcoinPriceData.labels[index],
            yAxis: bitcoinPriceData.values[index],
            label: `Fear And Greed Value: ${fearAndGreedValue}`,
          },
        };
      }
    );

    const datasets: any[] = [];
    datasets.push({
      label: "BTC Price",
      data: bitcoinPriceData.values,
      backgroundColor: "rgba(30, 34, 45, 1)",
      borderColor: "rgba(30, 34, 45, 1)",
      borderWidth: 1,
      showLine: true,
      pointRadius: 3,
      pointBorderColor: "rgba(0, 0, 0, 0)",
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
    });

    datasets.push({
      label: bitcoinFearAndGreedData.legendLabel,
      data: customFearAndGreedDataset,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
      showLine: false,
      pointBackgroundColor: colors,
      pointRadius: 3,
    });

    setChartDatasets(datasets);
  }
  return (
    <section className="home-section">
      <div className="home-content flex w-full flex-col">
        <div>
          <div className="space-y-6">
            <Header text="Fear And Greed Index" />
            <Description
              text={
                <>
                  The Fear and Greed Index is a tool that helps investors and
                  traders analyze the Bitcoin and Crypto market based on
                  sentiment. It determines whether the market is becoming too
                  afraid or too greedy. Therefore, it is called the Fear and
                  Greed Index.<br></br>
                  <br></br>The idea is that when the market is generally too
                  afraid, it may mean that Bitcoin is cheap and undervalued at
                  that time, offering a good buying opportunity. On the other
                  hand, when the Fear and Greed Index indicates that market
                  participants are extremely greedy, it may mean that the price
                  of Bitcoin is too high and it could be a good time to sell.
                  <br></br>
                  <br></br>
                  Understanding the scores from the Index could give an astute
                  investor the chance to buy when the market is too afraid and
                  sell when the market is extremely greedy, potentially
                  improving their investment decisions.<br></br>This indicator
                  would show red numbers and state "extreme fear" when market
                  sentiment is extremely negative. It would show green numbers
                  and "extreme greed" when sentiment and market momentum are
                  extremely positive.
                </>
              }
            />
          </div>
          <div className="mt-10">
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

export default BitcoinFearAndGreedIndex;
