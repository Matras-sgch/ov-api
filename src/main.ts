import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateInputPipe());

  // define the options or config settinga for swagger document
  const options = new DocumentBuilder()
    .setTitle('api')
    .setDescription('by Marat Sergievich')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  // setup the swagger module 
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
