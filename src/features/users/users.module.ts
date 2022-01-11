import { AuthModule } from '@features/auth/auth.module';
import { RolesModule } from '@features/roles/roles.module';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '@db-models/role.model';
import { User } from '@db-models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ChatGroup } from '@db-models/chat-group.model';
import { ChatDialog } from '@db-models/chat-dialog.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Role, ChatDialog, ChatGroup, UsersRoles]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
