import { useState, useEffect } from "react";
import CryptoCompareApi from "../api/CryptoCompareApi";
import ArbitrageCard, {
  ExchangeInfo,
} from "../components/arbitrage/ArbitrageCard";
import CoinHeader from "../components/arbitrage/CoinHeader";

import Bitstamp from "../assets/exchange-icons/bitstamp.svg";
import Coinbase from "../assets/exchange-icons/coinbase.svg";
import Gemini from "../assets/exchange-icons/gemini.svg";
import Kraken from "../assets/exchange-icons/kraken.svg";
import Binance from "../assets/exchange-icons/binance.svg";
import Cexio from "../assets/exchange-icons/cexio.svg";
import Lmax from "../assets/exchange-icons/lmax.svg";
import Gateio from "../assets/exchange-icons/gateio.svg";
import P2P from "../assets/exchange-icons/p2pb2b.svg";

function Arbitrage() {
  const [exchangeInfo, setExchangeInfo] = useState<{
    [key: string]: ExchangeInfo[];
  }>({});

  const coins: any[] = [
    { symbol: "BTC", name: "BITCOIN" },
    { symbol: "ETH", name: "ETHEREUM" },
    { symbol: "ADA", name: "CARDANO" },
  ];

  useEffect(() => {
    coins.forEach((coin) => {
      fetchData(coin.symbol);
    });
  }, []);

  function getLogo(name: string) {
    switch (name) {
      case "Bitstamp":
        return Bitstamp;
      case "Coinbase":
        return Coinbase;
      case "Gemini":
        return Gemini;
      case "Kraken":
        return Kraken;
      case "binanceusa":
        return Binance;
      case "Cexio":
        return Cexio;
      case "lmax":
        return Lmax;
      case "Gateio":
        return Gateio;
      case "P2PB2B":
        return P2P;
      default:
        return null;
    }
  }

  const fetchData = async (coin: string) => {
    try {
      const data: ExchangeInfo[] =
        await CryptoCompareApi.getTopExchangesVolumeDataByPair(coin);
      const exchangeInfoWithLogos = data.map((exchange) => ({
        ...exchange,
        logo: getLogo(exchange.name),
      }));
      setExchangeInfo((prevExchangeInfo) => ({
        ...prevExchangeInfo,
        [coin]: exchangeInfoWithLogos,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const exchangeInfoArray: ExchangeInfo[][] = Object.values(exchangeInfo);
  console.log(exchangeInfoArray);

  return (
    <section className="home-section">
      {coins?.map((coin, index) => (
        <div key={index} className="home-content flex">
          <CoinHeader title={coin.name} />
          <div className="grid gap-12 xsm:grid-cols-2 xs:grid-cols-4 xl:gap-16">
            {exchangeInfoArray[index]?.map((exchange, index) => (
              <ArbitrageCard key={index} exchangeInfo={exchange} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Arbitrage;
