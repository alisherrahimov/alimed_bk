import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(1234);

    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error while starting up the application', error);
  }
}
bootstrap();
