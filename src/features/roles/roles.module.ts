import { UsersRoles } from '@db-models/combined/users-roles.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '@db-models/role.model';
import { User } from '@db-models/user.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UsersRoles])],
  exports: [RolesService],
})
export class RolesModule {}
