import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';

async function start() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
