import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastVisible, setForecastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null); 

  const apikey2 = process.env.REACT_APP_WEATHER_API_KEY; //  pragatirastogi12@gmail.com
  const location = 'Lucknow';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeather = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey2}&q=${location}&aqi=yes`);
        const forecast = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apikey2}&q=${location}&days=14`);
        const astronomy = await axios.get(`https://api.weatherapi.com/v1/astronomy.json?key=${apikey2}&q=${location}&dt=${new Date().toISOString().split('T')[0]}`);
        const alerts = await axios.get(`https://api.weatherapi.com/v1/alerts.json?key=${apikey2}&q=${location}`);
        
        setWeatherData({
          current: currentWeather.data,
          forecast: forecast.data.forecast.forecastday,
          astronomy: astronomy.data,
          alerts: alerts.data.alerts,
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWeatherData();
  },[apikey2]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='error-message'>Error fetching weather data.</p>;

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="weather-content">
          <h2 className="location-title">Weather in {weatherData.current.location.name}</h2>
          
          <div className="temperature">
            <span className="temp-value">{weatherData.current.current.temp_c}°C</span>
            <img src={weatherData.current.current.condition.icon} alt={weatherData.current.current.condition.text} className="condition-icon" />
            <p className="condition-text">{weatherData.current.current.condition.text}</p>
          </div>

          {/* 14-Day Forecast Toggle */}
          <div 
            className="forecast-toggle"
            onMouseEnter={() => setForecastVisible(true)}
            onMouseLeave={() => setForecastVisible(false)}
          >
            <h4>14-Day Forecast &#9925;</h4>

            {forecastVisible && (
              <div className="forecast-box">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <strong>{day.date}</strong>: {day.day.avgtemp_c}°C - {day.day.condition.text}
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="additional-info">
            <div className="section-header" onClick={() => toggleSection('astronomy')}>
              <h5>Astronomy</h5>
            </div>
            {expandedSection === 'astronomy' && (
              <div className="section-content">
                <p>Sunrise: {weatherData.astronomy.astronomy.astro.sunrise}</p>
                <p>Sunset: {weatherData.astronomy.astronomy.astro.sunset}</p>
              </div>
            )}

            <div className="section-header" onClick={() => toggleSection('airQuality')}>
              <h5>Air Quality</h5>
            </div>
            {expandedSection === 'airQuality' && (
              <div className="section-content">
                <p>PM2.5: {weatherData.current.current.air_quality.pm2_5}</p>
                <p>PM10: {weatherData.current.current.air_quality.pm10}</p>
                <p>O3: {weatherData.current.current.air_quality.o3}</p>
                <p>CO: {weatherData.current.current.air_quality.co}</p>
              </div>
            )}

            <div className="section-header" onClick={() => toggleSection('alerts')}>
              <h5 className='animated-heading'>Weather Alerts</h5>
            </div>
            {expandedSection === 'alerts' && (
              <div className="section-content">
                {weatherData.alerts.length > 0 ? (
                  weatherData.alerts.map((alert, index) => (
                    <div key={index} className="alert-box">
                      <p><strong>{alert.headline}</strong></p>
                      <p>{alert.desc}</p>
                    </div>
                  ))
                ) : (
                  <p>No weather alerts at this time.</p>
                )}
              </div>
            )}

            <div className="section-header" onClick={() => toggleSection('wind')}>
              <h5>Wind Data</h5>
            </div>
            {expandedSection === 'wind' && (
              <div className="section-content">
                <p>Wind Speed: {weatherData.current.current.wind_kph} kph</p>
                <p>Wind Direction: {weatherData.current.current.wind_dir}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
