import { NewsData } from "../../api/PrivateServerApi";

function NewsCardVertical({ newsData }: { newsData: NewsData }) {
  return (
    <a href={newsData.url}>
      <div className="card-news">
        <div className="card-news-header">
          <img
            src={newsData.image_url}
            alt="card_image"
            className="card-news-image"
            width="300"
          />
        </div>
        <div className="card-news-body">
          <span className="tag tag-red">{newsData.source}</span>
          <h4>{newsData.title}</h4>
          <p>{newsData.description}</p>
        </div>
        <div className="card-news-footer">
          <div className="date">
            <h5>{newsData.published_at.toString()}</h5>
          </div>
        </div>
      </div>
    </a>
  );
}

export default NewsCardVertical;
