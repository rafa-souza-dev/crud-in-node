import 'dotenv/config'
import mongoose from 'mongoose';

const mongoDbURL = process.env.MONGO_DB_URL;

export const connectMongoDB = async () => {
    if (!mongoDbURL) {
        throw new Error('MONGO_DB_URL has not set in environment');
    }

    try {
        await mongoose.connect(mongoDbURL);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};
