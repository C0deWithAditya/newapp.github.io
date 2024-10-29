import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date,source } = this.props;

    return (
      <div className="container my-3">
        <div className="card" style={{ border: "0px", borderRadius: "0px" }}>
          <img
            className="card-img-top img-fluid"
            src={
              !imageUrl
                ? "https://media.istockphoto.com/id/1181901573/vector/latest-news-isolated-icon-megaphone-or-bullhorn-breaking-report-vector-info-announcement-and.jpg?s=1024x1024&w=is&k=20&c=V7pRBbIXlehzsJA9lyRGzfz0dYfr93zGUvSOvWTDmsc="
                : imageUrl
            }
            alt="News thumbnail"
            style={{
              height: "120px",
              objectFit: "cover",
              borderRadius: "0px",
            }}
          />
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{Left:'90%',zIndex:'1'}}>
            {source}
            <span className="visually-hidden">unread messages</span>
            </span>
              {title ? title : "Untitled News"}...
            </h5>
            <p className="card-text" style={{ color: "#555", fontSize: "11px" }}>
              {description ? description : "No description available"}...
            </p>
            <p className="card-text" style={{fontSize:"12px"}}><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-sm"
              style={{
                padding: "4px 10px",
                fontSize: "12px",
                borderRadius: "5px",
              }}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
