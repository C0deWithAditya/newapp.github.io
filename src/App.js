import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import CommentForm from './components/Comments/CommentForm';
import CommentList from './components/Comments/CommentList'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Footer from './components/Footer'; 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  handleCommentSubmit = (newComment) => {
    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }));
  };

  render() {
    return (
      <>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<News country="us" category="general" />} />
            <Route exact path="/business" element={<News key="business" country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News key="general" country="us" category="general" />} />
            <Route exact path="/health" element={<News key="health" country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" country="us" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" country="us"  category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" country="us" category="technology" />} />
          </Routes>

          {/* Comments Section */}
          <div className="comments-section">
            <h2>Comments</h2>
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            <CommentList comments={this.state.comments} />
          </div>
          
          {/* Footer Section */}
          <Footer />
        </Router>
      </>
    );
  }
}
