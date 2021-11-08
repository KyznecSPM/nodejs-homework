import express from 'express';
import { PORT } from './constants';

const server = express();

server.use(express.json());

server.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

export { server };
