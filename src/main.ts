import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
const port = process.env.PORT || 2024;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(new RateLimitMiddleware());
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
