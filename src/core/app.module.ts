import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModule } from 'src/features/chat/chat.module';
import { UsersModule } from '../features/users/users.module';
import { User } from '@db-models/user.model';
import { RolesModule } from '../features/roles/roles.module';
import { Role } from '@db-models/role.model';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { AuthModule } from '../features/auth/auth.module';
import { ChatGroup } from '@db-models/chat-group.model';
import { ChatDialog } from '@db-models/chat-dialog.model';
import { RoutingModule } from './app.routing.module';
import { UsersChats } from '@db-models/combined/users-chats.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, ChatDialog, ChatGroup, UsersRoles, UsersChats],
      autoLoadModels: true,
      // sync: { force: true },
    }),
    RoutingModule,
    ChatModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
