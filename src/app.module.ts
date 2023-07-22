import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { LibraryModule } from './library/library.module';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    UserModule,
    LibraryModule,
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class AppModule {}
