import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IpWhitelistGuard } from './guards/ip-whitelist.guard';
const port = process.env.PORT || 2024;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Банковское API')
    .setDescription('API для управления банковскими аккаунтами')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const ipWhitelistGuard = app.get(IpWhitelistGuard);
  app.useGlobalGuards(ipWhitelistGuard);

  await app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}
bootstrap();
