import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  // Require JWT_SECRET in production
  if (isProd && !process.env.JWT_SECRET) {
    console.error('❌ FATAL: JWT_SECRET environment variable is required in production!');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet());

  // CORS
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : isProd
      ? ['https://shophoa.techcave.space']
      : ['http://localhost:3456', 'http://localhost:3000'];
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger — chỉ bật trong development
  if (!isProd) {
    const config = new DocumentBuilder()
      .setTitle('BloomStore API')
      .setDescription('REST API for BloomStore flower shop')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 BloomStore API running at http://localhost:${port}`);
  if (!isProd) {
    console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
  }
  console.log(`🔧 Admin panel at http://localhost:${port}/quanly`);
}
bootstrap();
