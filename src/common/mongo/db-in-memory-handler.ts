import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoDB: MongoMemoryServer;

/**
 * Connect to the in-memory database. TEST
 */
export const rootMongooseTestModule = () =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongoDB = await MongoMemoryServer.create();
      const mongoUri = mongoDB.getUri();
      return {
        uri: mongoUri,
      };
    },
  });

/**
 * Drop database, close the connection and stop mongodDB. TEST
 */
export const closeInMongoDBConnection = async () => {
  if (mongoDB) await mongoDB.stop();
};
