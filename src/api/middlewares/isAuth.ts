import { RequestHandler } from 'express';
import ServerError from '../util/errors';
import * as jwt from 'jsonwebtoken';
import User from '../models/employee.model';
import { SECRET_TOKEN_KEY } from '../../config/constant';

function isAuth(cancelFetch: boolean = false): RequestHandler {
  return async (req, _, next) => {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        throw new ServerError('not authorized', 401);
      }
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, SECRET_TOKEN_KEY) as { id: string };
      if (!decodedToken) {
        throw new ServerError('Not authenticated', 401);
      }
      req.userId = decodedToken.id;
      if (!cancelFetch) {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          throw new ServerError('Not authenticated', 401);
        }
        req.user = user;
      }
      next();
    } catch (err) {
      next(new ServerError('invalied token', 400));
    }
  };
}

export default isAuth;
