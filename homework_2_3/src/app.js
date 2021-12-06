import expressWinston from 'express-winston';
import winston from 'winston';
import methodOverride from 'method-override';
import { server } from './config/server';
import { database } from './config/database';
import { userRouter, groupsRouter } from './api';
import { PORT } from './config/constants';

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/data.log'
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});

server.use(methodOverride());
server.use(logger);

server.use('/api/v1/users', userRouter);
server.use('/api/v1/groups', groupsRouter);

server.use(errorLogger);

server.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
