import axios from "axios";

export interface NewsData {
  uuid: string;
  title: string;
  description: string;
  keyworkds: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  relevance_score: number;
}

class PrivateServerApi {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getNews(): Promise<NewsData[]> {
    try {
      const response = await this.api.get(`/api/news`);
      let data = response.data;
      let newsDataArray: NewsData[] = data.map((item: any) =>
        this.convertToNewsData(item)
      );
      return newsDataArray;
    } catch (error) {
      console.log(`Error while getting getNews: ${error}`);
      throw error;
    }
  }

  private convertToNewsData(item: any): NewsData {
    return {
      uuid: item.uuid,
      title: item.title,
      description: item.description,
      keyworkds: item.keyworkds,
      snippet: item.snippet,
      url: item.url,
      image_url: item.image_url,
      language: item.language,
      published_at: this.formatDate(item.published_at),
      source: item.source,
      relevance_score: item.relevance_score,
    };
  }

  private formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }
}

export default new PrivateServerApi();
