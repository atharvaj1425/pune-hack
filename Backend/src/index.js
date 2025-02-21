import dotenv from 'dotenv';
import express from 'express';
import { app } from './app.js';
import { connectDB } from './db/db.js';
import path from 'path';

// Load environment variables only once
const result = dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

// Verify Cloudinary config
console.log('Environment variables loaded:', {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Server is ready');
});