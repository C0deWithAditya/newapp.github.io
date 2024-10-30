import React, { Component } from "react";
import NewsItem from "./NewsItem";
import '../App.css';
import PropTypes from 'prop-types';
import tophead from './tophead.png';
import Weather from "./Weather";
import Stock from "./Stock";

export class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalPages: 0,
      currentDateTime: new Date().toLocaleString(),
    };
    this.loadingMore = false; 
  }

  componentDidMount() {
    this.fetchArticles();
    this.interval = setInterval(() => {
      this.setState({ currentDateTime: new Date().toLocaleString() });
    }, 1000);

    
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", this.handleScroll); // Remove scroll event listener
  }

  fetchArticles = async () => {
    const { page, articles } = this.state;
    const { pageSize } = this.props;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${apiKey}&page=${page}&pageSize=${pageSize}`;
  
    this.setState({ loading: true });
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Upgrade": "h2c", // Request HTTP/2 upgrade if required by the server
        }
      });
  
      const parsedData = await response.json();
      
      console.log("API Response:", parsedData);
  
      if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
        console.error("Expected 'articles' to be an array but found:", parsedData.articles);
        throw new Error("Invalid response format: 'articles' is missing or not an array.");
      }
  
      this.setState({
        articles: [...articles, ...parsedData.articles],
        totalPages: Math.ceil(parsedData.totalResults / pageSize),
        loading: false,
      });
      this.loadingMore = false;
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ loading: false });
    }
  };
  

  handleScroll = () => {
    const { loading, page, totalPages } = this.state;

    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
      !loading &&
      !this.loadingMore &&
      page < totalPages
    ) {
      this.loadingMore = true; 
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        () => this.fetchArticles()
      );
    }
  };

  render() {
    const firstArticle = this.state.articles[0];
    const remainingArticles = this.state.articles.slice(1);

    return (
      <>
        <div className="container-fluid my-3 news-section" style={{ paddingLeft: '0', paddingRight: '0' }}>
        
          <div className="row d-flex justify-content-between align-items-center mb-3">
            <div className="col-md-8 text-center text-md-start" style={{ height: 'auto' }}>
              <img src={tophead} alt="top heading" className="img-fluid" style={{ marginLeft: '260px' }} />
            </div>
            <div className="col-md-4 text-end">
              <h5>{this.state.currentDateTime}</h5>
            </div>
          </div>
          {firstArticle && (
            <div className="card hero-card bg-dark text-white">
              <img
                src={firstArticle.urlToImage || "https://media.istockphoto.com/id/1181901573/vector/latest-news-isolated-icon-megaphone-or-bullhorn-breaking-report-vector-info-announcement-and.jpg?s=1024x1024&w=is&k=20&c=V7pRBbIXlehzsJA9lyRGzfz0dYfr93zGUvSOvWTDmsc="}
                className="card-img img-fluid"
                alt="Top news"
              />
              <div className="card-img-overlay d-flex flex-column justify-content-end hero-overlay">
                <h2 className="card-title hero-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {firstArticle.title || "No Title Available"}
                </h2>
                <p className="card-text hero-text" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {firstArticle.description || "No Description Available"}
                </p>
                <p className="card-text hero-time" style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                  {`Published at: ${new Date(firstArticle.publishedAt).toLocaleString()}`}
                </p>
              </div>
            </div>
          )}
          <div className="row my-4 ms-2">
            <div className="col-md-8">
              <div className="border border-dark p-3">
                <h3 className="text-center">Top Headline on {this.capitalizeFirstLetter(this.props.category)}</h3>
                <div className="row news-cards">
                  {!this.state.loading &&
                    remainingArticles.map((element) => (
                      <div className="col-md-4 mb-3" key={element.url}>
                        <NewsItem
                          title={element.title ? element.title.slice(0, 45) : ""}
                          description={element.description ? element.description.slice(0, 88) : ""}
                          imageUrl={element.urlToImage}
                          newsUrl={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}
                        />
                      </div>
                    ))}
                </div>
                {this.state.loading && (
                  <div className="text-center mt-3">
                    <span>Loading more articles...</span>
                  </div>
                )}
              </div>
            </div>
              <div className="col-md-4">
              <div className="d-flex align-items-center mx-3">
                <Weather />
              </div>
              <div className="d-flex align-items-center mx-3 mt-3">
                <Stock /> 
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default News;
