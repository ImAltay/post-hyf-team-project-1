import express from 'express';
import authentication from './authentication';
import goalRoutes from './goalRoutes';

const router = express.Router();

// Mount the authentication and goal routes
router.use('/auth', authentication); // Authentication routes
router.use('/goals', goalRoutes);     // Goal-related routes

export default router;
