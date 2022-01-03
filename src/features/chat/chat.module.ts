import { ChatGroup } from '@db-models/chat-group.model';
import { UserChatGroups } from '@db-models/combined/user-chat-groups.model';
import { User } from '@db-models/user.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGroupModule } from './group/chat-group.module';
import { ChatDialogModule } from './dialog/chat-dialog.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    SequelizeModule.forFeature([User, ChatGroup, UserChatGroups]),
    ChatGroupModule,
    ChatDialogModule,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
