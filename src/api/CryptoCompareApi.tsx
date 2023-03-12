import axios from "axios";
import { off } from "process";
import { ExchangeInfo } from "../components/arbitrage/ArbitrageCard";
import { ChartData } from "../components/CustomChartJS";
import { MiningInfo } from "../components/mining/MiningCard";

class CryptoCompareApi {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: "https://min-api.cryptocompare.com/data",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Apikey 46e889baccfee92b72b19abe2b5a8e16df05649b7bfd8a3999170942cecc8b92",
      },
    });
  }

  convertTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1; // months are zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  toScientificNotation = (num: number): string => {
    const exponent = num.toFixed(0).length - 1; // determina l'esponente
    const mantissa = (num / Math.pow(10, exponent)).toFixed(2); // determina la mantissa
    return mantissa.toString() + "E+" + exponent.toString(); // restituisce la notazione scientifica
  };

  public async getDailyPairOHLCV(
    fromSymbol: string,
    toSymbol: string,
    limit: number = 1500, // 1500 * 3 calls = 12 years of data
    recursiveCalls: number = 2,
    chartData: ChartData = { values: [], labels: [], legendLabel: fromSymbol },
    toTs?: number
  ): Promise<ChartData> {
    try {
      const response = await this.api.get(
        `v2/histoday?fsym=${fromSymbol}&tsym=${toSymbol}&limit=${limit}${
          toTs ? `&toTs=${toTs}` : ""
        }`
      );
      const values: number[] = response.data.Data.Data.map(
        (obj: { close: number }) => obj.close
      );
      const labels: string[] = response.data.Data.Data.map(
        (obj: { time: number }) => this.convertTimestampToDate(obj.time)
      );
      chartData.values.unshift(...values);
      chartData.labels.unshift(...labels);
      if (values.length === 0 || recursiveCalls <= 0) {
        return chartData;
      }
      const earliestTimestamp = Math.min(
        ...response.data.Data.Data.map((obj: { time: number }) => obj.time)
      );
      return this.getDailyPairOHLCV(
        fromSymbol,
        toSymbol,
        limit,
        recursiveCalls - 1,
        chartData,
        earliestTimestamp
      );
    } catch (error) {
      console.log(`Error while getting getDailyPairOHLCV: ${error}`);
      throw error;
    }
  }

  public async getLatestBitcoinBalanceDistribution(): Promise<ChartData> {
    const chartData: ChartData = {
      values: [],
      labels: [],
      legendLabel: "BTC Balance Distribution",
    };
    try {
      const response = await this.api.get(
        `blockchain/balancedistribution/latest?fsym=BTC`
      );
      console.log(response.data.Data.balance_distribution);
      const distribution: any[] = response.data.Data.balance_distribution;
      if (distribution === null || distribution.length === 0) {
        return chartData;
      }

      const values: number[] = distribution.map((element) => {
        return element.addressesCount;
      });
      const labels: string[] = distribution.map((element) => {
        if (element.to === 0) {
          return `${element.from}+ BTC`;
        }
        return `${element.from}-${element.to} BTC`;
      });

      chartData.values = values;
      chartData.labels = labels;

      console.log(chartData);
      return chartData;
    } catch (error) {
      console.log(
        `Error while getting getLatestBitcoinBalanceDistribution: ${error}`
      );
      throw error;
    }
  }

  public async getTopExchangesVolumeDataByPair(
    coin: string
  ): Promise<ExchangeInfo[]> {
    try {
      const response = await this.api.get(
        `https://min-api.cryptocompare.com/data/top/exchanges?fsym=${coin}&tsym=USD`
      );
      console.log(response.data.Data);

      let exchangeInfo: ExchangeInfo[] = [];

      response.data.Data.forEach((exchange: any) => {
        let coinData: ExchangeInfo = {
          logo: null,
          name: exchange.exchange,
          price: Number(exchange.price.toFixed(2)),
          volume: Number(exchange.volume24h.toFixed(2)),
          exchangeGrade: exchange.exchangeGrade,
        };
        exchangeInfo.push(coinData);
      });

      console.log(exchangeInfo);

      return exchangeInfo;
    } catch (error) {
      console.log(
        "Error while getting getTopExchangesVolumeDataByPair:",
        error
      );
      throw error;
    }
  }

  public async getMiningInfo(listOfCoins: string): Promise<MiningInfo[]> {
    try {
      const response = await this.api.get(
        `https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=${listOfCoins}&tsyms=USD`
      );
      console.log(response.data.Data["BTC"]);
      let data = response.data.Data;
      const coins = listOfCoins.split(",").map((coin) => coin.trim());

      let miningInfo: MiningInfo[] = [];

      coins.forEach((coin) => {
        let currentCoin = data[coin].CoinInfo;
        let newMiningInfo: MiningInfo = {
          logo: null,
          name: currentCoin.FullName,
          netHashes:
            currentCoin.NetHashesPerSecond === 0
              ? "0"
              : this.toScientificNotation(currentCoin.NetHashesPerSecond),
          blockNumber: currentCoin.BlockNumber,
          blockTime: Number.isInteger(currentCoin.BlockTime)
            ? currentCoin.BlockTime
            : currentCoin.BlockTime.toFixed(2),
          blockReward: Number.isInteger(currentCoin.BlockReward)
            ? currentCoin.BlockReward
            : currentCoin.BlockReward.toFixed(2),
          totalCoinsMined: Number.isInteger(currentCoin.TotalCoinsMined)
            ? currentCoin.TotalCoinsMined
            : currentCoin.TotalCoinsMined.toFixed(2),
          maxSupply: this.toScientificNotation(currentCoin.MaxSupply),
        };
        miningInfo.push(newMiningInfo);
      });

      return miningInfo;
    } catch (error) {
      console.log("Error while getting mining info:", error);
      throw error;
    }
  }
}

export default new CryptoCompareApi();
