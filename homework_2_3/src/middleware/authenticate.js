import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET || '';

export const authenticateMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send('No token provided.');
  }
  return jwt.verify(token, SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send('Failed to authenticate token.');
    }
    next();
  });
};
