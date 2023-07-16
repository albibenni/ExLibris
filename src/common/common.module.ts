import { Module } from '@nestjs/common';
import { rootMongooseModule } from './mongo/db-handler';

@Module({ imports: [rootMongooseModule()] })
export class CommonModule {}
