import { useState, useEffect } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import ChartCard from "../../components/ChartCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import ChartNoDropdownsContainer from "../../components/ChartNoDropdownsContainer";
import { ChartDataset, Colors } from "chart.js";
import CustomChartJS, { ChartData } from "../../components/CustomChartJS";
import ChartOnlyScaleOptionContainer from "../../components/ChartOnlyScaleOptionContainer";

function BitcoinHalving() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });

  const [chartAnnotations, setChartAnnotations] = useState<any[]>([]);

  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        1500,
        2
      );

      console.log(data.labels);
      const endDate = new Date("09/01/2026");
      const currentDate = new Date(data.labels[data.labels.length - 1]);
      while (currentDate <= endDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        const formattedDate = currentDate.toLocaleDateString();

        data.labels.push(formattedDate);
        data.values.push(NaN);
      }

      setChartLabels(data.labels);

      setBitcoinPriceChart(data);

      createChartDatasets(data.values);

      const firstBitcoinHalvingIndex = data.labels.indexOf("28/11/2012");
      const secondBitcoinHalvingIndex = data.labels.indexOf("9/7/2016");
      const thirdBitcoinHalvingIndex = data.labels.indexOf("11/5/2020");
      const forthBitcoinHalvingIndex = thirdBitcoinHalvingIndex + 1398;

      const annotations = [
        {
          type: "line",
          yMin: 0,
          yMax: 100000,
          xMin: firstBitcoinHalvingIndex,
          xMax: firstBitcoinHalvingIndex,
          borderColor: "rgba(255, 99, 132,1)",
          borderWidth: 2,
        },
        {
          type: "label",
          xValue: firstBitcoinHalvingIndex,
          yValue: 20000,
          backgroundColor: "rgba(245,245,245)",
          content: ["First Halving", "28/11/2012"],
          font: {
            size: 9,
          },
        },
        {
          type: "line",
          yMin: 0,
          yMax: 100000,
          xMin: secondBitcoinHalvingIndex,
          xMax: secondBitcoinHalvingIndex,
          borderColor: "rgba(255, 99, 132,1)",
          borderWidth: 2,
        },
        {
          type: "label",
          xValue: secondBitcoinHalvingIndex,
          yValue: 20000,
          backgroundColor: "rgba(245,245,245)",
          content: ["Second Halving", "09/07/2016"],
          font: {
            size: 9,
          },
        },
        {
          type: "line",
          yMin: 0,
          yMax: 100000,
          xMin: thirdBitcoinHalvingIndex,
          xMax: thirdBitcoinHalvingIndex,
          borderColor: "rgba(255, 99, 132,1)",
          borderWidth: 2,
        },
        {
          type: "label",
          xValue: thirdBitcoinHalvingIndex,
          yValue: 20000,
          backgroundColor: "rgba(245,245,245)",
          content: ["Third Halving", "11/05/2020"],
          font: {
            size: 9,
          },
        },
        {
          type: "line",
          yMin: 0,
          yMax: 100000,
          xMin: forthBitcoinHalvingIndex,
          xMax: forthBitcoinHalvingIndex,
          borderColor: "rgba(255, 99, 132,1)",
          borderWidth: 2,
        },
        {
          type: "label",
          xValue: forthBitcoinHalvingIndex,
          yValue: 20000,
          backgroundColor: "rgba(245,245,245)",
          content: ["Forth Halving", "09/03/2024"],
          font: {
            size: 9,
          },
        },
      ];
      setChartAnnotations(annotations);
    } catch (error) {
      console.log(error);
    }
  };
  function createChartDatasets(data: number[]) {
    const datasets: ChartDataset[] = [];
    datasets.push({
      label: "BTC Price",
      data: data,
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
        <Header text="Bitcoin Halving" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
            <Description
              text={
                <>
                  "Halving" of Bitcoin is an event that occurs every about four
                  years and reduces the amount of Bitcoin generated with each
                  new block of the blockchain by 50%.<br></br>
                  <br></br>The first halving of Bitcoin took place on November
                  28, 2012, the second on July 9, 2016, and the third on May 11,
                  2020. The reason why Bitcoin halvings were designed is to
                  limit the supply of Bitcoin and protect its currency from
                  inflation. As the amount of Bitcoin generated every time a new
                  block is added to the blockchain is reduced, the demand for
                  Bitcoin should increase, which could cause the price to go up.
                  <br></br>
                  <br></br>Bitcoin halvings have had a significant impact on the
                  price of Bitcoin in the past. After the first halving, the
                  price of Bitcoin increased 1,000% in less than a year. After
                  the second halving, the price of Bitcoin increased 800% in
                  less than a year.<br></br>However, it is important to note
                  that the price of Bitcoin is highly volatile and can be
                  influenced by many factors, so it is not possible to predict
                  with certainty how the next halving will affect the price.
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
                annotations={chartAnnotations}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitcoinHalving;
