// This file is part of the moderation service in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the moderation of comments.

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const LOG_KEY = '[MODERATION_SERVICE]: ';

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const status = content.includes('orange') ? 'rejected' : 'approved';

    const event = {
      type: 'CommentModerated',
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
      }).catch(error => {
        console.error(`${LOG_KEY}Error sending event to event bus:`, error);
      });
  }

  res.send({ status: 'OK' });
});

app.listen(4003, () => {
  console.log('Moderation service is running on port 4003');
});