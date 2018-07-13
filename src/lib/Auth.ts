import jwt from 'express-jwt';
import { jwtSecret } from '../config';
import { Request } from 'express';

/**
 *
 *
 * @param {Request} req
 * @returns
 */
const getTokenFromHeaders = (req: Request) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

export const auth = {
  required: jwt({
    secret: jwtSecret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: jwtSecret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};
