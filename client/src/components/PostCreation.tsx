import React, { useState } from 'react';
import { createPost } from '../services';

const PostCreation: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('The post title cannot be empty.');
      return;
    }

    createPost(title)
      .then(post => {
        console.log('Post created:', post);
        setTitle('');
      })
      .catch(error => {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again later.');
      });
  };

  return (
    <>
      <h2>Create a New Post:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="post-title">Post Title:</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
};

export default PostCreation;