import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.PORT || 2024;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}
bootstrap();
