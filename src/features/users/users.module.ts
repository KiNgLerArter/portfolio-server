import { AuthModule } from '@features/auth/auth.module';
import { RolesModule } from '@features/roles/roles.module';
import { UserRoles } from '@db-models/combined/user-roles.model';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '@db-models/role.model';
import { User } from '@db-models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ChatGroup } from '@db-models/chat-group.model';
import { UserChatGroups } from '@db-models/combined/user-chat-groups.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      ChatGroup,
      UserRoles,
      UserChatGroups,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
