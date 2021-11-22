import { server } from './config/server';
import { database } from './config/database';
import { userRouter, groupsRouter } from './api';

server.use('/api/v1/users', userRouter);
server.use('/api/v1/groups', groupsRouter);

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
