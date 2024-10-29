// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Categories</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/general">General News</Link></li>
              <li><Link to="/sports">Sports</Link></li>
              <li><Link to="/technology">Technology</Link></li>
              <li><Link to="/health">Health</Link></li>
              <li><Link to="/business">Business</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Taza_khabar is a dynamic platform that delivers the latest headlines from various categories, including business, entertainment, health, science, sports, and technology. Users can engage with the news by sharing comments and insights, while also staying informed about local weather and stock market trends. </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: adityagen.lko12@gmail.com</p>
            <p>Phone: +91 0000001101</p>
            <a href="https://github.com/C0deWithAditya" style={{textDecoration:'none',color:'white'}}>Github Profile❤️</a><br />
            <a href="https://github.com/C0deWithAditya?tab=repositories" style={{textDecoration:'none',color:'white'}}>Github Repository❤️</a>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>❤️&copy; {new Date().getFullYear()}❤️ By_Aditya_Taza_khabar❤️</p>
          <a href='https://c0dewithaditya.github.io/textutils/' style={{textDecoration:'none',color:'white'}}>This is another Porject Please Click With ❤️ </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
