import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset, Colors } from "chart.js";
import CustomChartJS, { ChartData } from "../../components/CustomChartJS";
import ChartOnlyScaleOptionContainer from "../../components/ChartOnlyScaleOptionContainer";
import PieCard from "../../components/PieCard";

function BitcoinBalanceDistribution() {
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
      var data: ChartData =
        await CryptoCompareApi.getLatestBitcoinBalanceDistribution();

      setChartLabels(data.labels);

      setBitcoinPriceChart(data);

      const colors = [
        "rgba(78, 95, 210, 1)",
        "rgba(0, 136, 255, 1)",
        "rgba(0, 86, 116, 1)",
        "rgba(0, 172, 116, 1)",
        "rgba(0, 217, 97, 1)",
        "rgba(255, 255, 127, 1)",
        "rgba(255, 168, 127, 1)",
        "rgba(255, 123, 0, 1)",
        "rgba(255, 59, 0, 1)",
        "rgba(255, 0, 0, 1)",
      ];

      createChartDatasets(data.values, colors);
    } catch (error) {
      console.log(error);
    }
  };
  function createChartDatasets(data: number[], colors: string[]) {
    const datasets: ChartDataset[] = [];
    datasets.push({
      label: "BTC Balance Distribution",
      data: data,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      showLine: true,
      pointRadius: 0,
    });

    setChartDatasets(datasets);
  }
  return (
    <section className="home-section">
      <div className="home-content flex w-full flex-col">
        <div>
          <div className="space-y-6">
            <Header text="Bitcoin Balance Distribution" />

            <Description
              text={
                <>
                  The distribution of bitcoin across various wallets can be a
                  very useful piece of information for understanding how the
                  value of the cryptocurrency is distributed within the
                  community.<br></br>For example, if we see that most of the
                  bitcoin is held in a few large wallets, this could indicate a
                  concentration of wealth, while a more even distribution could
                  indicate that the value is more widely distributed among a
                  variety of participants.<br></br>
                  <br></br>Furthermore, the data on the distribution of bitcoin
                  can be used to make predictions about the future value of the
                  cryptocurrency.<br></br>For example, if we see that there is
                  an even distribution of bitcoin among a large number of small
                  wallets, this could indicate a solid base of small-scale
                  users, which could be a positive sign for the future value of
                  bitcoin.
                  <br></br>
                  <br></br>Following large wallets that accumulate more bitcoin
                  can also be a bullish sign. This is because if these wallets
                  are controlled by reputable and influential individuals or
                  organizations, their accumulation of bitcoin may indicate
                  confidence in the future value of the cryptocurrency.<br></br>
                </>
              }
            />
          </div>
          <div className="mt-10">
            <PieCard>
              <div className="pie-chart-container flex items-center justify-center">
                <CustomChartJS
                  labels={chartLabels}
                  datasets={chartDatasets}
                  config={{
                    type: "pie",
                    scale: "linear",
                  }}
                />
              </div>
            </PieCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitcoinBalanceDistribution;
