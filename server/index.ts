import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';
import dotenv from 'dotenv';

const app = express();

// Middleware setup
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Load environment variables
dotenv.config();

// Create server
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

// MongoDB connection
const MONGO = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose
  .connect(MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: Error) => console.error('MongoDB connection error:', error));

mongoose.connection.on('error', (error: Error) => {
  console.log('MongoDB error:', error);
});

// Use routes
app.use('/api', router);
