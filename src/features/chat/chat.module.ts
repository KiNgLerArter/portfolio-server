import { ChatGroup } from '@models/chat-group.model';
import { UserChatGroups } from '@models/combined/user-chat-groups.model';
import { User } from '@models/user.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [SequelizeModule.forFeature([User, ChatGroup, UserChatGroups])],
})
export class ChatModule {}
