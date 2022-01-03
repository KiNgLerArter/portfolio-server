import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupController } from './chat-group.controller';

@Module({
  providers: [ChatGroupService],
  controllers: [ChatGroupController],
  exports: [ChatGroupService],
})
export class ChatGroupModule {}
