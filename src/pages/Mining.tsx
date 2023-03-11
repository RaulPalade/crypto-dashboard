import { useEffect, useState } from "react";
import CryptoCompareApi from "../api/CryptoCompareApi";
import MiningCard, { MiningInfo } from "../components/mining/MiningCard";

import Bitcoin from "../assets/coin-icons/bitcoin.svg";
import Ethereum from "../assets/coin-icons/ethereum.svg";
import Ravencoin from "../assets/coin-icons/ravencoin.svg";

function Mining() {
  const [miningInfo, setMiningInfo] = useState<MiningInfo[]>([]);

  let coinList = "BTC,ETH,RVN";

  function getLogo(name: string) {
    switch (name) {
      case "Bitcoin":
        return Bitcoin;
      case "Ethereum":
        return Ethereum;
      case "Ravencoin":
        return Ravencoin;
      default:
        return null;
    }
  }

  useEffect(() => {
    fetchData(coinList);
  }, []);

  const fetchData = async (coinList: string) => {
    try {
      const data: MiningInfo[] = await CryptoCompareApi.getMiningInfo(coinList);

      const updatedData = data.map((miningInfo) => ({
        ...miningInfo,
        logo: getLogo(miningInfo.name),
      }));

      console.log(updatedData);

      setMiningInfo(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="home-section">
      <div className="home-content flex flex-col">
        <h1 className="p-10 text-5xl text-white">Mining</h1>

        <div className="grid grid-cols-3 gap-10">
          {miningInfo?.map((mining) => {
            return <MiningCard miningInfo={mining} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Mining;
