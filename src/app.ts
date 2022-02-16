import express, { Express } from 'express';

const app: Express = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
