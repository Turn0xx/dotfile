import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { snapshot: true },
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Pocket Ticket')
    .setDescription('The Pocket Ticket API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .addTag('Client')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();