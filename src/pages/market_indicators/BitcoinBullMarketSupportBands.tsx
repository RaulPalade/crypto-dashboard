import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset } from "chart.js";
import { ChartData } from "../../components/CustomChartJS";

function BitcoinBullMarketSupportBands() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin20SMAChart, setBitcoin20SMAChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [bitcoin21EMAChart, setBitcoin21EMAChart] = useState<ChartData>({
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
      bitcoin20SMAChart,
      bitcoin21EMAChart
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
      const processedChartData20SMA: ChartData = {
        values: calculate20WSMA(data.values),
        labels: data.labels,
        legendLabel: "20W SMA",
      };

      const processedChartData21EMA: ChartData = {
        values: calculate21WEMA(data.values),
        labels: data.labels,
        legendLabel: "21W EMA",
      };
      setChartLabels(data.labels.slice(1000));
      setBitcoinPriceChart(data);
      setBitcoin20SMAChart(processedChartData20SMA);
      setBitcoin21EMAChart(processedChartData21EMA);
      createChartDatasets(
        data,
        processedChartData20SMA,
        processedChartData21EMA
      );
    } catch (error) {
      console.log(error);
    }
  };

  function calculate20WSMA(prices: number[]) {
    const sma20 = [];

    for (let i = 0; i < prices.length; i++) {
      const sum = prices
        .slice(i - 139, i + 1)
        .reduce((acc, price) => acc + price, 0);
      const average = sum / 140;
      sma20.push(average);
    }
    return sma20;
  }

  function calculate21WEMA(prices: number[]) {
    const ema21 = [];
    const multiplier = 2 / (147 + 1);
    let ema = prices[146];

    for (let i = 0; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema;
      ema21.push(ema);
    }

    return ema21;
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
            <Header text="BTC Bull Market Support Bands" />
            <Description
              text={
                <>
                  Bitcoin Bull Market Support Bands are a technical analysis
                  tool used to identify potential support levels during a
                  bullish phase of the Bitcoin market. These bands are created
                  by plotting multiple moving averages at different periods,
                  such as 50-day, 100-day, and 200-day moving averages, and are
                  often combined with other indicators.
                  <br></br>
                  <br></br>
                  The Bull Market Support Bands provide visual zones on the
                  chart that indicate potential areas where buying interest and
                  price support may be present. Traders and investors use these
                  bands to gauge the strength of the bullish trend and determine
                  potential entry or exit points for their Bitcoin positions.
                  <br></br>
                  These bands can act as dynamic support levels during Bitcoin's
                  upward moves, helping traders make informed decisions based on
                  the prevailing market conditions.
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

export default BitcoinBullMarketSupportBands;
