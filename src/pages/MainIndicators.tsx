import ChartCard from "../components/ChartCard";
import ChartSmaEmaContainer from "../components/ChartSmaEmaContainer";
import { ChartData } from "../components/ChartSingleLine";
import CryptoCompareApi from "../api/CryptoCompareApi";
import { useEffect, useState } from "react";

function MainIndicators() {
  const [chartData, setChardData] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        30
      );
      setChardData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <ChartCard>
          <ChartSmaEmaContainer {...chartData} />
        </ChartCard>
      </div>
    </section>
  );
}

export default MainIndicators;
