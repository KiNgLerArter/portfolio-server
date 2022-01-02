import { AuthModule } from '@features/auth/auth.module';
import { RolesModule } from '@features/roles/roles.module';
import { UserRoles } from '@models/combined/user-roles.model';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { User } from '@models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ChatGroup } from '@models/chat-group.model';
import { UserChatGroups } from '@models/combined/user-chat-groups.model';

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
