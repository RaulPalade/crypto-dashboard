import ChartCard from "../components/ChartCard";
import ChartSmaEmaContainer from "../components/ChartSmaEmaContainer";
import CryptoCompareApi from "../api/CryptoCompareApi";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Description from "../components/Description";
import { ChartData } from "../components/CustomChartJS";
import { ChartDataset } from "chart.js";

function OnChainIndicators() {
  // const [chartLabels, setChartLabels] = useState<string[]>([]);
  // const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);
  // const [viewingOption, setViewingOption] = useState(0);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
  //       "BTC",
  //       "USD",
  //       2000
  //     );
  //     setChartLabels(data.labels);
  //     setChartDatasets([
  //       {
  //         label: "BTC Price",
  //         data: data.values,
  //         backgroundColor: "rgba(30, 34, 45, 1)",
  //         borderColor: "rgba(30, 34, 45, 1)",
  //         borderWidth: 1,
  //         pointBackgroundColor: "#fff",
  //         pointRadius: 0.1,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  function onViewingOptionChanged(value: number) {
    // setViewingOption(value);
  }

  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="Chart without name" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
            <Description
              text={
                <>
                  A chart that displays the trend of a cryptocurrency is a
                  useful tool for visualizing how the value of a cryptocurrency
                  has changed over time. The chart can be customized to display
                  various metrics, such as the closing price or trading volume.
                  <br /> <br />
                  The chart can be displayed in various ways, such as a line
                  chart showing the value of the cryptocurrency over time, or a
                  bar chart showing the trading volume for each time period.
                  <br />
                  <br />
                  Additionally, indicators such as the moving average or RSI can
                  be added to help better understand price movements. A chart of
                  the trend of a cryptocurrency is an essential tool for
                  investors who want to monitor the market and make informed
                  investment decisions.
                </>
              }
            />
          </div>
          <div className="lg:flex-grow-3 mt-5 lg:ml-6 lg:mt-0 lg:w-2/3">
            {/* <ChartCard>
              <ChartSmaEmaContainer
                labels={chartLabels}
                datasets={chartDatasets}
                viewingOptionCallback={onViewingOptionChanged}
              />
            </ChartCard> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnChainIndicators;
