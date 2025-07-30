// This file is part of the posts service in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the creation and retrieval of posts.
// The posts are stored in memory for simplicity.
import express, { Request, Response }  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const randomId = (): string => {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${now}-${random}`;
};

interface Post {
  id: string;
  title: string;
}

const posts: { [key: string]: Post } = {};

app.post('/posts', (req: Request, res: Response) => {
  const { title } = req.body;
  const id = randomId();

  posts[id] = { id, title };

  const event = {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  };

  axios.post('http://localhost:4005/events', event)
    .then(() => {
      console.log('Event sent to event bus');
    })
    .catch(error => {
      console.error('Error sending event to event bus:', error);
    });
  
  res.status(201).send(posts[id]);
});

app.post('/events', (req: Request, res: Response) => {
  const event = req.body;
  console.log('Event received:', event);

  res.send({ status: 'OK' });
});

app.listen(4000, () => {
  console.log('Posts service is running on port 4000');
});