
import React from "react";
import { createComment } from "../services";
import { useState } from "react";

const CommentCreation: React.FC<{ postId: string }> = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('The comment content cannot be empty.');
      return;
    }

    createComment(postId, content)
      .then(comment => {
        console.log('Comment created:', comment);
        setContent('');
      })
      .catch(error => {
        console.error('Error creating comment:', error);
        alert('Failed to create comment. Please try again later.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-content">Comment:</label>
      <input
        id="comment-content"
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Enter comment content"
        required
      />
      <button type="submit">Create Comment</button>
    </form>
  );
};

export default CommentCreation;