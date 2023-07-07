import axios from "axios";
import { ChartData } from "../components/CustomChartJS";

/**
 * Classe che rappresenta un'API per l'accesso ai dati di Alternative.me.
 */
class AlternativeMeApi {
  private api: any;

  /**
   * Crea un'istanza di AlternativeMeApi.
   */
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.alternative.me",
      headers: {
        "Content-Type": "application/json",
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
   * Ottiene l'indice Fear & Greed con i dati dei punteggi.
   *
   * @param {number} limit - Il numero massimo di punti dati da ottenere.
   * @param {ChartData} chartData - I dati della tabella del grafico da aggiornare.
   * @returns {Promise<ChartData>} I dati aggiornati della tabella del grafico.
   * @throws {Error} Se si verifica un errore durante la richiesta API.
   */
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
