// src/components/Comments/CommentList.js

import React from 'react';
import './CommentList.css'; // Importing CSS for styling

const CommentList = ({ comments }) => {
  return (
    <ul className="comment-list">
      {comments.map((comment, index) => (
        <li key={index} className="comment-item">
          <div className="comment-text">
            {comment}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
