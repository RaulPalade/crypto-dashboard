import axios from "axios";
import { ChartData } from "../components/CustomChartJS";

class AlternativeMeApi {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.alternative.me",
      headers: {
        "Content-Type": "application/json",
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

  public async getFearAndGreedIndex(
    limit: number = 4500,
    chartData: ChartData = {
      values: [],
      labels: [],
      legendLabel: "Fear & Greed Score",
    }
  ): Promise<ChartData> {
    try {
      const response = await this.api.get(`/fng/?limit=${limit}`);
      const values: number[] = response.data.data.map(
        (obj: { value: number }) => obj.value
      );
      const labels: string[] = response.data.data.map(
        (obj: { timestamp: number }) =>
          this.convertTimestampToDate(obj.timestamp)
      );
      chartData.values.push(...values);
      chartData.labels.push(...labels);

      return chartData;
    } catch (error) {
      console.log(`Error while getting getDailyPairOHLCV: ${error}`);
      throw error;
    }
  }
}

export default new AlternativeMeApi();
