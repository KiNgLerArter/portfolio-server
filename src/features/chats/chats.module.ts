import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

import { UsersChats } from '@db-models/combined/users-chats.model';
import { User } from '@db-models/user.model';
import { Chat } from '@db-models/chat.model';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from '@features/users/users.module';
import { AuthModule } from '@features/auth/auth.module';

@Module({
  providers: [ChatsGateway, ChatsService],
  imports: [
    SequelizeModule.forFeature([User, Chat, UsersChats]),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
