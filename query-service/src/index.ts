// This file is part of the posts service in a microservices architecture.
// Is for study purposes and is not intended for production use.

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: { [key: string]: { id: string; title: string, comments: { id: string; content: string }[] } } = {};

app.get('/posts', (_: Request, res: Response) => {
  res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log(`Post created:`, { id, title });
  }

  if (type === 'CommentCreated') {
    const { postId, id, content } = data;

    const post = posts[postId];
    
    if (!post) {
      console.error(`Post with id ${postId} not found for comment creation.`);
      return res.status(404).send({ error: 'Post not found' });
    }

    post.comments.push({ id, content });
    console.log(`Comment created for post ${postId}:`, { id, content });
  }

  console.log('POSTS SERVICE - Event received:', posts);

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Posts service is running on port 4002');
});