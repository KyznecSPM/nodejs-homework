import { server } from './config/server';
import { database } from './config/database';
import { userRouter } from './api';

server.use('/api/v1', userRouter);

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
