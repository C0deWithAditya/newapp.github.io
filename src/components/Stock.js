import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

const Stock = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const finnhubApiKey = process.env.REACT_APP_STOCK_API_KEY; 

  useEffect(() => {
    const fetchGlobalMarketNews = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/news', {
          params: {
            category: 'general', 
            token: finnhubApiKey,
          },
        });
        
        setNews(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching global market news:', error);
        setError('Error fetching global market news');
      }
    };

    fetchGlobalMarketNews();
  }, [finnhubApiKey]);

  return (
    <div className="stock-news-container">
      <h3 className="animated-heading">Today's Big News About the Stock Market</h3>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : news.length > 0 ? (
        <ul className="news-list">
          {news.map((article, index) => (
            <li key={index} className="news-item">
              <div className="news-content">
                {article.image && (
                  <img src={article.image} alt={article.headline} className="news-image" />
                )}
                <div className="news-text">
                  <h4 className="news-title">
                    {article.headline.slice(0, 50)}
                    {article.headline.length > 50 ? '...' : ''}
                  </h4>
                  <p className="news-summary">
                    {article.summary.slice(0, 100)}
                    {article.summary.length > 100 ? '...' : ''}
                  </p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read more
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="loading-message">Loading global market news...</p>
      )}
    </div>
  );
};

export default Stock;
