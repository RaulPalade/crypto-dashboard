import { useEffect, useState } from "react";
import CryptoCompareApi from "../../api/CryptoCompareApi";
import { ChartData } from "../../components/CustomChartJS";
import TableHead from "../../components/TableHead";
import TableRow, { CoinValueInterface } from "../../components/TableRow";

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

function RunningROI() {
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

  useEffect(() => {
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
          price: todayPrice,
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

        setCoinListValues((prevState) => [...prevState, currentCoin]);
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
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <TableHead />
                  <tbody>
                    {coinListValues?.map((coin) => {
                      return <TableRow {...coin} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RunningROI;
