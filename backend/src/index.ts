import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import { authRouter } from './routes/authRouter';
import { shiftRouter } from './routes/shiftRouter';
import { sportRouter } from './routes/sportRouter';
import { userRouter } from './routes/userRouter';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Routes
app.use('/api', authRouter);
app.use('/api/shifts', shiftRouter);
app.use('/api/sports', sportRouter);
app.use('/api/users', userRouter);

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
