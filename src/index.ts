import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const app = express()
  .use(cookieParser())
  .use(bodyParser.json())
  .use(compression())
  .use(cors({ credentials: true }));

const server = http.createServer(app);
server.listen(8080, () => console.log('Server running on http://localhost:8080'));
