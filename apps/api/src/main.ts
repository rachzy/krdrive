import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: environment.origin,
    credentials: true,
  });

  // Serve static files from uploads directory in project root
  // (For legacy files)
  if (environment.production) {
    app.useStaticAssets(join(__dirname, 'uploads'), {
      prefix: '/uploads',
    });
  } else {
    app.useStaticAssets(join(__dirname, '..', '..', '..', 'uploads'), {
      prefix: '/uploads',
    });
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
