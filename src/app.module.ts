import { Module } from '@nestjs/common';
import { UserModule } from './user/users/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
