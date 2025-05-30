import 'dotenv/config'
import mongoose from 'mongoose';

import { logger } from '../logger/index.ts';

const mongoDbUrl = process.env.MONGO_DB_URL ?? 'mongodb://root:root@mongodb:27017';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoDbUrl);
        logger.info('MongoDB Connected');
    } catch (err) {
        logger.error(`MongoDB connection error: ${err}`);
        throw err;
    }
};
