import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || '';

export const Login = (username, password) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 1, // срок действия токена
      // Передаю password согласно заданию, в production такого делать категорически нельзя!
      data: { username, password }
    },
    SECRET
  );
};
