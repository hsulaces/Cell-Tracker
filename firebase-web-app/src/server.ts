//src/server.ts
//express server handles cadd api requests
import express from 'express';
import cors from 'cors';
import caddRouter from './api/cadd.js';

const app = express();
const port = 3000;

app.use(cors());
app.use('/api', caddRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
