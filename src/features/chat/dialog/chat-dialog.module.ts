import { Module } from '@nestjs/common';
import { ChatDialogService } from './chat-dialog.service';
import { ChatDialogController } from './chat-dialog.controller';

@Module({
  providers: [ChatDialogService],
  controllers: [ChatDialogController],
  exports: [ChatDialogService],
})
export class ChatDialogModule {}
