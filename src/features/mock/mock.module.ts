import { Chat } from '@db-models/chat.model';
import { UsersChats } from '@db-models/combined/users-chats.model';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { Message } from '@db-models/message.model';
import { Role } from '@db-models/role.model';
import { Token } from '@db-models/token.model';
import { User } from '@db-models/user.model';
import { AuthModule } from '@features/auth/auth.module';
import { ChatsModule } from '@features/chats/chats.module';
import { RolesModule } from '@features/roles/roles.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MockService } from './mock.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Chat,
      Role,
      Token,
      Message,
      UsersChats,
      UsersRoles,
    ]),
    AuthModule,
    RolesModule,
    ChatsModule,
  ],
  providers: [MockService],
})
export class MockModule {}
