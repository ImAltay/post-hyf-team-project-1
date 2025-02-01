import express from 'express';
import http from 'http' ;
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';
import dotenv from 'dotenv';

const app = express(); 

app.use(cors({
    credentials: true 
}));



app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

dotenv.config();

const server = http.createServer(app);

server.listen(8080,() => {
    console.log('Server running on http://localhost:8080/')
})

const MONGO = process.env.MONGO_URL

mongoose.Promise = Promise;

mongoose.connect(MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
  });

mongoose.connection.on('error', (error: Error) => {
  console.log('MongoDB error:', error);
});

app.use('/api' , router());