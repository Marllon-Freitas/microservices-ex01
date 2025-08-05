// This file is part of the comments service in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the creation and retrieval of comments for a particular post.
// The comments are stored in memory for simplicity.
import express, { Request, Response }  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const LOG_KEY = '[COMMENTS_SERVICE]: ';

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
  status?: string;
}

const commentsByPostId: { [key: string]: Comment[] } = {};

app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const { content } = req.body;
  const id = randomId();

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  const event = {
    type: 'CommentCreated',
    data: {
      id,
      postId: req.params.id,
      content,
      status: 'pending',
    },
  };

  axios.post('http://localhost:4005/events', event)
    .then(() => {
      console.log(`${LOG_KEY}Event sent to event bus`);
    })
    .catch(error => {
      console.error(`${LOG_KEY}Error sending event to event bus:`, error);
    });

  res.status(201).send({ id, content });
});

app.post('/events', async (req: Request, res: Response) => {
  console.log(`${LOG_KEY}Event received:`, req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { id, postId, content, status } = data;

    const comments = commentsByPostId[postId] || [];
    const comment = comments.find(comment => comment.id === id);

    if (comment) {
      comment.status = status;
      console.log(`${LOG_KEY}Comment updated:`, { id, postId, content, status });

      const event = {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          content,
          status,
        },
      };

      await axios.post('http://localhost:4005/events', event)
        .then(() => {
          console.log(`${LOG_KEY}Event sent to event bus:`, event);
        })
        .catch(error => {
          console.error(`${LOG_KEY}Error sending event to event bus:`, error);
        });
    } else {
      console.error(`${LOG_KEY}Comment with id ${id} not found for moderation.`);
    }
  }

  res.send({ status: 'OK' });
});

app.listen(4001, () => {
  console.log('Comments service is running on port 4001');
});