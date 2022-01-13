import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

import { UsersChats } from '@db-models/combined/users-chats.model';
import { User } from '@db-models/user.model';
import { Chat } from '@db-models/chat.model';
import { MessageModule } from './message/message.module';
import { UsersModule } from '@features/users/users.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    SequelizeModule.forFeature([User, Chat, UsersChats]),
    UsersModule,
    MessageModule,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
