import axios from "axios";
import { ExchangeInfo } from "../components/arbitrage/ArbitrageCard";
import { ChartData } from "../components/CustomChartJS";
import { MiningInfo } from "../components/mining/MiningCard";

/**
 * Classe che rappresenta un'API per l'accesso ai dati di CryptoCompare.
 */
class CryptoCompareApi {
  private api: any;

  /**
   * Crea un'istanza di CryptoCompareApi.
   */
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

  /**
   * Converte un timestamp in una data nel formato "giorno/mese/anno".
   *
   * @param {number} timestamp - Il timestamp da convertire.
   * @returns {string} La data formattata nel formato "giorno/mese/anno".
   */
  convertTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1; // i mesi partono da 0
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  /**
   * Converte un numero in notazione scientifica.
   *
   * @param {number} num - Il numero da convertire.
   * @returns {string} Il numero convertito in notazione scientifica.
   */
  toScientificNotation = (num: number): string => {
    const exponent = num.toFixed(0).length - 1; // determina l'esponente
    const mantissa = (num / Math.pow(10, exponent)).toFixed(2); // determina la mantissa
    return mantissa.toString() + "E+" + exponent.toString(); // restituisce la notazione scientifica
  };

  /**
   * Ottiene i dati OHLCV (apertura, massimo, minimo, chiusura e volume giornaliero) di una coppia di valute per un determinato periodo di tempo.
   *
   * @param {string} fromSymbol - Simbolo della valuta di origine.
   * @param {string} toSymbol - Simbolo della valuta di destinazione.
   * @param {number} limit - Il numero massimo di punti dati da ottenere.
   * @param {number} recursiveCalls - Il numero massimo di chiamate ricorsive per ottenere dati più vecchi.
   * @param {ChartData} chartData - I dati della tabella del grafico da aggiornare.
   * @param {number} toTs - Timestamp fino al quale ottenere i dati.
   * @returns {Promise<ChartData>} I dati aggiornati della tabella del grafico.
   * @throws {Error} Se si verifica un errore durante la richiesta API.
   */
  public async getDailyPairOHLCV(
    fromSymbol: string,
    toSymbol: string,
    limit: number = 1500,
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

  /**
   * Ottiene i dati sulla distribuzione del saldo Bitcoin più recenti.
   *
   * @returns {Promise<ChartData>} I dati sulla distribuzione del saldo Bitcoin.
   * @throws {Error} Se si verifica un errore durante la richiesta API.
   */
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

  /**
   * Ottiene i dati sul volume delle principali borse per una determinata coppia di valute.
   *
   * @param {string} coin - Simbolo della valuta.
   * @returns {Promise<ExchangeInfo[]>} I dati sul volume delle principali borse.
   * @throws {Error} Se si verifica un errore durante la richiesta API.
   */
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

  /**
   * Ottiene le informazioni sul mining per una lista di monete.
   *
   * @param {string} listOfCoins - Elenco delle monete separate da virgola.
   * @returns {Promise<MiningInfo[]>} Le informazioni sul mining delle monete.
   * @throws {Error} Se si verifica un errore durante la richiesta API.
   */
  public async getMiningInfo(listOfCoins: string): Promise<MiningInfo[]> {
    try {
      const response = await this.api.get(
        `https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=${listOfCoins}&tsyms=USD`
      );
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
