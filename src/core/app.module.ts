import { Module } from '@nestjs/common';
import { ChatModule } from 'src/features/chat/chat.module';
import { AppController } from './app.controller';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
})
export class AppModule {}
