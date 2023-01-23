import React from "react";

const NewsContent = (props)=>{

    let { title, desc, imgUrl, newsUrl, author, publishedAt, source } =
      props;
    return (
      <div className="my-5">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              position: "absolute",
              right: "0%",
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author === null ? "Unknown" : author} at{" "}
                {new Date(publishedAt).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsUrl} rel="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsContent;
