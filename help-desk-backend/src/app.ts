import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import ticketRoutes from './routes/ticket.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

// Load environment variables first
dotenv.config();

// Initialize the Express app
const app: Application = express();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to the database', err);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Help Desk API is running...');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is accessible' });
});

// Mount routes
app.use('/api/tickets', ticketRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;