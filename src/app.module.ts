import { Module } from '@nestjs/common';
import { UserModule } from './user/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule, UserModule],
})
export class AppModule {}
