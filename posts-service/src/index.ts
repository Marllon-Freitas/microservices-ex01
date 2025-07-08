// This file is part of the posts service in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the creation and retrieval of posts.
// The posts are stored in memory for simplicity.
import express, { Request, Response }  from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const randomId = (): string => {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${now}-${random}`;
};

interface Post {
  id: string;
  title: string;
}

const posts: Array<Post> = [];

app.get('/posts', (_: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', (req: Request, res: Response) => {
  const { title } = req.body;
  const id = randomId();
  posts.push({ id, title });
  res.status(201).send(posts.find(post => post.id === id));
});

app.listen(4000, () => {
  console.log('Posts service is running on port 4000');
});