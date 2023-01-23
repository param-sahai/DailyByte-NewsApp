import React, { useEffect, useState } from "react";
import NewsContent from "./NewsContent";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };
  document.title = "DailyByte - " + capitalizeTitle(props.category);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json(data);
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // const handleNextClick = async () => {
  //   if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
  //     setPage(page + 1);
  //     updateNews();
  //   }
  // };

  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  const fetchMoreData = () => {
    setTimeout(async () => {
      setPage(page + 1);
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${props.category}&apiKey=${props.apiKey}&page=${
        page + 1
      }&pagesize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json(data);
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }, 200);
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginTop: "5.5rem" }}>
        DailyByte - Top Headlines on {capitalizeTitle(props.category)}
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4 " key={index}>
                  <NewsContent
                    title={
                      element.title === null
                        ? element.title
                        : element.title.slice(0, 45)
                    }
                    desc={
                      element.description === null
                        ? element.description
                        : element.description.slice(0, 50)
                    }
                    imgUrl={
                      element.urlToImage === null
                        ? "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
