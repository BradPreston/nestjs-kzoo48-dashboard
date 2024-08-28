import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Kazoo 48 Film Festival')
    .setDescription(
      'API documentation for the Kazoo 48 Film Festival admin dashboard',
    )
    .setVersion('0.1')
    .build();
  // Swagger document setup
  const document = SwaggerModule.createDocument(app, config);
  // setup Swagger with the enpoint /api
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(
      `Running API in mode: ${process.env.NODE_ENV} on port: ${PORT}`,
    );
  });
}
bootstrap();
