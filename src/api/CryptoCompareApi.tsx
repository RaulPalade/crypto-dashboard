import axios from "axios";
import { ChartData } from "../components/CustomChart";

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

  public async getDailyPairOHLCV(
    fromSymbol: string,
    toSymbol: string,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(
        `v2/histoday?fsym=${fromSymbol}&tsym=${toSymbol}&limit=30`
      );
      console.log(response.data.Data.Data);
      const values: number[] = response.data.Data.Data.map(
        (obj: { close: number }) => obj.close
      );
      const labels: string[] = response.data.Data.Data.map(
        (obj: { time: number }) => this.convertTimestampToDate(obj.time)
      );
      const chardData: ChartData = {
        values: values,
        labels: labels,
      };
      return chardData;
    } catch (error) {
      console.log(`Error while getting getDailyPairOHLCV: ${error}`);
      throw error;
    }
  }
}

export default new CryptoCompareApi();
