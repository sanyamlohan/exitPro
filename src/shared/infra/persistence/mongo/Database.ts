import { logger } from '@core/logger/Logger';
import mongoose from 'mongoose';
//import mongoose from 'mongoose';

export class MongoDbConnection {
  public static async initConnection() {
    // environment variables
    const MONGO_URI = `mongodb+srv://sam:sam123@cluster0.2clfzsq.mongodb.net/entry-exit-system?retryWrites=true&w=majority`;
    mongoose.set('strictQuery', false);
    await MongoDbConnection.connect(MONGO_URI);
  }

  public static async connect(connStr: string) {
    return mongoose
      .connect(connStr, { retryWrites: true, w: 'majority' })
      .then(() => {
        logger.info('Mongo connected successfully.');
      })
      .catch((error) => {
        logger.error('Error connecting to database:', error);
        return process.exit(1);
      });
  }

  public static setAutoReconnect() {
    const MONGO_URI = `mongodb+srv://sam:sam123@cluster0.2clfzsq.mongodb.net/entry-exit-system?retryWrites=true&w=majority`;
    mongoose.connection.on('disconnected', () =>
      MongoDbConnection.connect(MONGO_URI)
    );
  }

  public static async disconnect() {
    await mongoose.connection.close();
  }
}
