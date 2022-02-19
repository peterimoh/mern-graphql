import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload)
        return payload;
      } catch (err) {
        throw new AuthenticationError('Your session expired. Sign in again.');
      }
    }
    throw new Error('Authentication token must be "Bearer [token]"');
  }
  throw new AuthenticationError('Authorization Header not found');
};
