import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const getValidationPipe = () =>
  new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    validationError: { target: false, value: false },
  });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(getValidationPipe());

  const port = configService.get<string>('PORT') || 3001;
  // app.useGlobalFilters(
  //   new ErrorFilter(),
  //   new MongoExceptionFilter(),
  //   new HttpExceptionFilter(),
  // );
  await app.listen(port);
}
bootstrap();
