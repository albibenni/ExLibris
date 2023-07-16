import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const rootMongooseModule = () =>
  MongooseModule.forRootAsync({
    useFactory: async (config: ConfigService) => {
      return {
        uri: config.get('MONGO_URI'),
      };
    },
    inject: [ConfigService],
  });
