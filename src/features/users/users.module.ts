import { AuthModule } from '@features/auth/auth.module';
import { RolesModule } from '@features/roles/roles.module';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Role } from '@db-models/role.model';
import { User } from '@db-models/user.model';
import { Chat } from '@db-models/chat.model';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { UsersChats } from '@db-models/combined/users-chats.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Role, Chat, UsersRoles, UsersChats]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
