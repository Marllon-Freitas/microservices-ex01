// This file is part of the posts service in a microservices architecture.
// Is for study purposes and is not intended for production use.

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req: Request, res: Response) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event)
    .then(() => {
      console.log('Event sent to posts service');
    })
    .catch(error => {
      console.error('Error sending event to posts service:', error);
    });

  axios.post('http://localhost:4001/events', event)
    .then(() => {
      console.log('Event sent to comments service');
    })
    .catch(error => {
      console.error('Error sending event to comments service:', error);
    });

  axios.post('http://localhost:4002/events', event)
    .then(() => {
      console.log('Event sent to query service');
    })
    .catch(error => {
      console.error('Error sending event to query service:', error);
    });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Event bus is running on port 4005');
});