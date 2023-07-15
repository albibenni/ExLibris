import { Module } from '@nestjs/common';
import { UserModule } from './user/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGODB_URI), todo: make a commong module for mongo config connection
    UserModule,
  ],
})
export class AppModule {}
