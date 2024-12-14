import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config/data-source';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => console.error('Database connection failed:', error));

// Define a sample route
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
