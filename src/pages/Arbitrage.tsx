import { useState, useEffect } from "react";
import CryptoCompareApi from "../api/CryptoCompareApi";
import ArbitrageCard, { ArbitrageInfo } from "../components/ArbitrageCard";

function Arbitrage() {
  const [arbitrageInfo, setArbitrageInfo] = useState<ArbitrageInfo[]>([]);

  useEffect(() => {
    fetchData("BTC");
  }, []);

  const fetchData = async (coin: string) => {
    try {
      var data: ArbitrageInfo[] =
        await CryptoCompareApi.getTopExchangesVolumeDataByPair(coin);

      console.log(data);

      setArbitrageInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="home-section">
      <div className="home-content flex">
        <div className="flex w-full flex-col p-10">
          <h1 className="mb-2 text-4xl text-white">BITCOIN</h1>
          <span className="header-line"></span>
        </div>

        <div className="grid grid-cols-2 gap-16 lg:grid-cols-4">
          {arbitrageInfo?.map((arbitrage) => {
            return <ArbitrageCard exchangeInfo={arbitrage} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Arbitrage;
