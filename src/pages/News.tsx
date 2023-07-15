import { useEffect, useState } from "react";
import NewsCardVertical from "../components/news/NewsCardVertical";
import PrivateServerApi, { NewsData } from "../api/PrivateServerApi";

function News() {
  const [news, setNews] = useState<NewsData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: NewsData[] = await PrivateServerApi.getNews();

      const reversedData = data.reverse();
      setNews(reversedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xm:grid-cols-3">
          {news?.map((news) => {
            return <NewsCardVertical newsData={news} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default News;
