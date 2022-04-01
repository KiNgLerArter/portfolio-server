import { Chat } from '@db-models/chat.model';
import { Message } from '@db-models/message.model';
import { UsersModule } from '@features/users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesService } from './messages.service';

@Module({
  imports: [SequelizeModule.forFeature([Message, Chat])],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
