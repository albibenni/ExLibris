import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Library, LibrarySchema } from './library.model';
import { LibraryRepository } from './library.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Library.name, schema: LibrarySchema }]),
  ],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository],
  exports: [LibraryService, LibraryRepository],
})
export class LibraryModule {}
