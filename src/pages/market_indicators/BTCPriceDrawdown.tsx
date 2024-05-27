import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";
import { ChartData } from "../../components/CustomChartJS";

function BtcPriceDrawdown() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [btcPriceDrawdown, setBtcPriceDrawdown] = useState<ChartData>({
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
    createChartDatasets(bitcoinPriceChart, btcPriceDrawdown);
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
      const processedMovingAverage: ChartData = {
        values: calculateDrawdown(data.values),
        labels: data.labels,
        legendLabel: "Drawdown From ATH",
      };

      setChartLabels(data.labels.slice(1000));
      setBitcoinPriceChart(data);
      setBtcPriceDrawdown(processedMovingAverage);
      createChartDatasets(data, processedMovingAverage);
    } catch (error) {
      console.log(error);
    }
  };

  function calculateDrawdown(prices: number[]) {
    const drawdowns = [];
    let peak = prices[0];

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] > peak) {
        peak = prices[i];
      }

      const drawdown = ((peak - prices[i]) / peak) * 100;
      drawdowns.push(drawdown);
    }

    return drawdowns;
  }

  function createChartDatasets(data: ChartData, btcPriceDrawdown: ChartData) {
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
      label: btcPriceDrawdown.legendLabel,
      data: btcPriceDrawdown.values.slice(1000),
      backgroundColor: "rgba(41, 115, 115, 1)",
      borderColor: "rgba(41, 115, 115, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointRadius: 0,
      fill: true,
    });

    setChartDatasets(datasets);
  }
  return (
    <section className="home-section">
      <div className="home-content flex w-full flex-col">
        <div>
          <div className="space-y-6">
            <Header text="BTC Price Drawdown From ATH" />
            <Description
              text={
                <>
                  The long-term moving average is a technical analysis tool used
                  to smooth out price fluctuations and identify the overall
                  trend of an asset over an extended period. It is calculated by
                  averaging the closing prices of an asset over a specified
                  number of days, such as 50 or 200.
                  <br></br>
                  <br></br>
                  The long-term moving average helps traders and investors
                  identify the broader direction of the asset's price movement
                  and provides support and resistance levels.
                  <br></br>
                  <br></br>
                  By comparing the current price to the long-term moving
                  average, market participants can gain insights into potential
                  trend reversals or confirmations of the prevailing trend.
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
                doubleYAxis={true}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BtcPriceDrawdown;
