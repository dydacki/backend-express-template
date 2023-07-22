import mongoose from 'mongoose';
import { config } from './config/envConfig';

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  return mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
};
