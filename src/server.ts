import express from 'express';
import connectDB from './config/connection';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(express.json());

// Your routes here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});