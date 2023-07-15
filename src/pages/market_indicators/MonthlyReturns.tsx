import CryptoCompareApi from "../../api/CryptoCompareApi";
import { useEffect, useState } from "react";
import { ChartData } from "../../components/CustomChartJS";

function MonthlyReturns() {
  const [bitcointReturns, setBitcointReturns] = useState<ChartData>({
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
        1500,
        2
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>MonthlyReturns</div>;
}

export default MonthlyReturns;
