import 'dotenv/config'
import mongoose from 'mongoose';
import { logger } from '../logger/index.ts';

const mongoDbURL = process.env.MONGO_DB_URL;

export const connectMongoDB = async () => {
    if (!mongoDbURL) {
        throw new Error('MONGO_DB_URL has not set in environment');
    }

    try {
        await mongoose.connect(mongoDbURL);
        logger.info('MongoDB Connected');
    } catch (err) {
        logger.error(`MongoDB connection error: ${err}`);
        throw err;
    }
};
