'use strict';

import logger from './utils/logger.js';
import express from 'express';
import routes from './routes.js'; 

const app = express();
const port = 3000;
app.use("/", routes);

app.listen(port, () => console.log(`Express app running on port ${port}!`));

app.get('/', (request, response) => response.send('Welcome to the Playlist app!'));
app.get('/error', (request, response) => response.status(404).end('Page not found.'));
app.get("/dashboard", (request, response) => {
  const playlist = [
    {
      id: 1,
      title: "Piano Sonata No. 3",
      artist: "Beethoven"
    },
    {
      id: 2,
      title: "Piano Sonata No. 7",
      artist: "Beethoven"
    },
    {
      id: 3,
      title: "Piano Sonata No. 10",
      artist: "Beethoven"
    }
  ];
  response.json(playlist);
});


app.listen(port, () => logger.info(`Your app is listening on port ${port}!`));


