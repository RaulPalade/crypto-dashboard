import ChartCard from "../components/ChartCard";
import ChartToolbar from "../components/ChartToolbar";
import CustomChart, { ChartData } from "../components/CustomChart";
import CryptoCompareApi from "../api/CryptoCompareApi";
import { useEffect, useState } from "react";

function MainIndicators() {
  const [chartData, setChardData] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });

  const mockedChartData = {
    values: [123, 41, 42, 14, 1],
    labels: ["1", "2", "3", "4", "5"],
  };

  useEffect(() => {
    if (chartData.values.length == 0) {
      fetchData();
    }
  });

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        30
      );
      setChardData(data);
    } catch (error) {
      // handle error
    }
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <ChartCard>
          <ChartToolbar />
          <CustomChart {...chartData} />
        </ChartCard>
      </div>
    </section>
  );
}

export default MainIndicators;
