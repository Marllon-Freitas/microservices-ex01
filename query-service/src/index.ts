// This file is part of the query service in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the retrieval of posts and their comments.
// The posts and comments are stored in memory for simplicity.

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const LOG_KEY = '[QUERY_SERVICE]: ';

const posts: { [key: string]: { id: string; title: string, comments: { id: string; content: string, status: string }[] } } = {};

app.get('/posts', (_: Request, res: Response) => {
  res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log(`${LOG_KEY}Post created:`, { id, title });
  }

  if (type === 'CommentCreated') {
    const { postId, id, content, status } = data;

    const post = posts[postId];
    
    if (!post) {
      console.error(`${LOG_KEY}Post with id ${postId} not found for comment creation.`);
      return res.status(404).send({ error: 'Post not found' });
    }

    post.comments.push({ id, content, status });
    console.log(`${LOG_KEY}Comment created for post ${postId}:`, { id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { postId, id, content, status } = data;
    const post = posts[postId];

    if (post) {
      const comment = post.comments.find(comment => comment.id === id);
      if (comment) {
        comment.content = content;
        comment.status = status;
        console.log(`${LOG_KEY}Comment updated for post ${postId}:`, { id, content, status });
      } else {
        console.error(`${LOG_KEY}Comment with id ${id} not found for post ${postId}.`);
      }
    } else {
      console.error(`${LOG_KEY}Post with id ${postId} not found for comment update.`);
    }
  }

  console.log(`${LOG_KEY}Event received:`, posts);

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Posts service is running on port 4002');
});