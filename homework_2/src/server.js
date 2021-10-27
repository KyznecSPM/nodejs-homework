import express from 'express';
import { userRouter } from './user-router';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
