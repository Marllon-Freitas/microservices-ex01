// This file is part of the comments service in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the creation and retrieval of comments for a particular post.
// The comments are stored in memory for simplicity.
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

interface Comment {
  id: string;
  content: string;
}

const commentsByPostId: { [key: string]: Comment[] } = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  const postComments = commentsByPostId[req.params.id] || [];
  res.send(postComments);
});

app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const { content } = req.body;
  const id = randomId();

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });

  commentsByPostId[req.params.id] = comments;

  const event = {
    type: 'CommentCreated',
    data: {
      id,
      postId: req.params.id,
      content,
    },
  };

  axios.post('http://localhost:4005/events', event)
    .then(() => {
      console.log('Event sent to event bus');
    })
    .catch(error => {
      console.error('Error sending event to event bus:', error);
    });

  res.status(201).send({ id, content });
});

app.post('/events', (req: Request, res: Response) => {
  const event = req.body;
  console.log('Event received:', event);

  res.send({ status: 'OK' });
});

app.listen(4001, () => {
  console.log('Comments service is running on port 4001');
});