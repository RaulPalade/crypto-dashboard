import { useEffect, useState } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import { ChartData } from "../../components/CustomChartJS";
import Table from "../../components/table/Table";

import Bitcoin from "../../assets/coin-icons/bitcoin.svg";
import Ethereum from "../../assets/coin-icons/ethereum.svg";
import Bnb from "../../assets/coin-icons/bnb.svg";
import Xrp from "../../assets/coin-icons/xrp.svg";
import Cardano from "../../assets/coin-icons/cardano.svg";
import Dogecoin from "../../assets/coin-icons/dogecoin.svg";
import Polygon from "../../assets/coin-icons/polygon.svg";
import Solana from "../../assets/coin-icons/solana.svg";
import Litecoin from "../../assets/coin-icons/litecoin.svg";
import Polkadot from "../../assets/coin-icons/polkadot.svg";
import {
  CoinValueInterface,
  ModalValueInterface,
} from "../../components/table/TableBody";
import { Column } from "../../components/table/TableHead";

function RunningROI() {
  const columns: Column[] = [
    { label: "", accessor: "name" },
    { label: "Price", accessor: "price" },
    { label: "1 Day", accessor: "oneDay" },
    { label: "7 Days", accessor: "sevenDays" },
    { label: "30 Days", accessor: "thirtyDays" },
    { label: "90 Days", accessor: "ninetyDays" },
    { label: "1 Year", accessor: "oneYear" },
    { label: "2 Years", accessor: "twoYears" },
    { label: "3 Years", accessor: "threeYears" },
  ];

  enum Coins {
    BTC = "Bitcoin",
    ETH = "Ethereum",
    BNB = "BNB",
    XRP = "Xrp",
    ADA = "Cardano",
    DOGE = "Dogecoin",
    MATIC = "Polygon",
    SOL = "Solana",
    LTC = "Litecoin",
    DOT = "Polkadot",
  }

  const icons = [
    Bitcoin,
    Ethereum,
    Bnb,
    Xrp,
    Cardano,
    Dogecoin,
    Polygon,
    Solana,
    Litecoin,
    Polkadot,
  ];
  const [coinListValues, setCoinListValues] = useState<CoinValueInterface[]>(
    []
  );
  const [chartValues, setChartValues] = useState<ModalValueInterface[]>([]);

  useEffect(() => {
    if (coinListValues.length > 0) {
      return;
    }
    const fetchData = async (coinCode: string, coinName: string, icon: any) => {
      try {
        const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
          coinCode,
          "USD",
          1500,
          0
        );

        let prices = data.values;
        let size = prices.length;
        let todayPrice = prices[size - 1];

        let currentCoin: CoinValueInterface = {
          coinName,
          icon,
          price: Number(todayPrice.toFixed(2)),
          oneDay: Number(
            percentageChange(prices[size - 2], todayPrice).toFixed(1)
          ),
          sevenDays: Number(
            percentageChange(prices[size - 8], todayPrice).toFixed(1)
          ),
          thirtyDays: Number(
            percentageChange(prices[size - 31], todayPrice).toFixed(1)
          ),
          ninetyDays: Number(
            percentageChange(prices[size - 91], todayPrice).toFixed(1)
          ),
          oneYear: Number(
            percentageChange(prices[size - 366], todayPrice).toFixed(1)
          ),
          twoYears: Number(
            percentageChange(prices[size - 731], todayPrice).toFixed(1)
          ),
          threeYears: Number(
            percentageChange(prices[size - 1096], todayPrice).toFixed(1)
          ),
        };

        let dataset = {
          label: `${coinName} price`,
          data: data.values,
          backgroundColor: "rgba(30, 34, 45, 1)",
          borderColor: "rgba(30, 34, 45, 1)",
          borderWidth: 1,
          pointBackgroundColor: "#fff",
          showLine: true,
          pointRadius: 0,
        };

        let currentChart: ModalValueInterface = {
          labels: data.labels,
          dataset,
        };

        setCoinListValues((prevState) => [...prevState, currentCoin]);
        setChartValues((prevState) => [...prevState, currentChart]);
      } catch (error) {
        console.log(error);
      }
    };

    const coinsCodes = Object.keys(Coins);
    const coinNames = Object.values(Coins);
    coinsCodes.forEach((coin, index) => {
      fetchData(coin, coinNames[index], icons[index]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percentageChange = (initialValue: number, finalValue: number) => {
    return ((finalValue - initialValue) / initialValue) * 100;
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <div className="flex flex-col">
          <Table
            columns={columns}
            inTableData={coinListValues}
            chartData={chartValues}
          />
        </div>
      </div>
    </section>
  );
}

export default RunningROI;
