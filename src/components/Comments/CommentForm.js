// src/components/Comments/CommentForm.js

import React, { useState } from 'react';
import './CommentForm.css'; // Importing CSS for styling

const CommentForm = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(commentText);
      setCommentText(''); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave a comment..."
        required
        className="comment-input"
      />
      <button type="submit" className="comment-submit">Submit</button>
    </form>
  );
};

export default CommentForm;
