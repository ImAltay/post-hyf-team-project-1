import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../model/User';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // Retrieve the session token from cookies
    const sessionToken = req.cookies['cal-App'];

    if (!sessionToken) {
      return res.sendStatus(403); // Forbidden: Missing or invalid session token
    }

    // Retrieve the user by session token
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(404); // Not Found: User does not exist
    }

    // Attach user information to the request object
    merge(req, { identity: existingUser });

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.sendStatus(500); // Internal Server Error
  }
};
