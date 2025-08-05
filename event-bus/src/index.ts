// This file is part of the event bus in a microservices architecture.
// Is for study purposes and is not intended for production use.
// It handles the distribution of events to various services.
// The event bus listens for events and forwards them to the appropriate services.

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const LOG_KEY = '[EVENT_BUS]: ';

const app = express();
app.use(bodyParser.json());

app.post('/events', (req: Request, res: Response) => {
  const event = req.body;

  console.log('Event received: ', event);

  axios.post('http://localhost:4000/events', event)
    .then(() => {
      console.log(`${LOG_KEY}Event sent to posts service`, event);
    })
    .catch(error => {
      console.error(`${LOG_KEY}Error sending event to posts service:`, error);
    });

  axios.post('http://localhost:4001/events', event)
    .then(() => {
      console.log(`${LOG_KEY}Event sent to comments service`, event);
    })
    .catch(error => {
      console.error(`${LOG_KEY}Error sending event to comments service:`, error);
    });

  axios.post('http://localhost:4002/events', event)
    .then(() => {
      console.log(`${LOG_KEY}Event sent to query service`, event);
    })
    .catch(error => {
      console.error(`${LOG_KEY}Error sending event to query service:`, error);
    });

  axios.post('http://localhost:4003/events', event)
    .then(() => {
      console.log(`${LOG_KEY}Event sent to moderation service`, event);
    })
    .catch(error => {
      console.error(`${LOG_KEY}Error sending event to moderation service:`, error);
    });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Event bus is running on port 4005');
});