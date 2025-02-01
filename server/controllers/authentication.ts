import express, { Request, Response } from 'express';
import {
  createUser,
  getUserByEmail,
  getUserBySessionToken,
} from '../model/User';
import { random, authentication } from '../helpers/cryptPass';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400); // Bad Request
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400); // User already exists
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    return res.status(201).json(user); // Successfully created
  } catch (error) {
    console.error(error);
    return res.sendStatus(500); // Internal Server Error
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400); // Bad Request
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password +authentication.sessionToken'
    );

    if (!user) {
      return res.sendStatus(400); // User not found
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403); // Forbidden: Invalid credentials
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('cal-App', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(201).json(user); // Login success
  } catch (error) {
    console.error(error);
    return res.sendStatus(500); // Internal Server Error
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies['cal-App']; // Retrieve token from cookies

    if (!sessionToken) {
      return res.sendStatus(401); // Unauthorized: No active session
    }

    // Find the user with the session token
    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.sendStatus(404); // User not found
    }

    // Remove session token from the database
    user.authentication.sessionToken = undefined;
    await user.save();

    // Clear the authentication cookie
    res.clearCookie('cal-App', { domain: 'localhost', path: '/' });

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500); // Internal Server Error
  }
};
