import { ChatGroup } from '@db-models/chat-group.model';
import { User } from '@db-models/user.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGroupModule } from './group/chat-group.module';
import { ChatDialogModule } from './dialog/chat-dialog.module';
import { ChatDialog } from '@db-models/chat-dialog.model';
import { UsersChats } from '@db-models/combined/users-chats.model';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    SequelizeModule.forFeature([User, ChatGroup, ChatDialog, UsersChats]),
    ChatGroupModule,
    ChatDialogModule,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
