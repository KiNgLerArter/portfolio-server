import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatsModule } from '@features/chats/chats.module';
import { UsersModule } from '../features/users/users.module';
import { User } from '@db-models/user.model';
import { RolesModule } from '../features/roles/roles.module';
import { Role } from '@db-models/role.model';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { AuthModule } from '../features/auth/auth.module';
import { RoutingModule } from './app.routing.module';
import { UsersChats } from '@db-models/combined/users-chats.model';
import { Chat } from '@db-models/chat.model';
import { Message } from '@db-models/message.model';
import { Token } from '@db-models/token.model';

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
      models: [User, Role, Chat, Message, Token, UsersRoles, UsersChats],
      autoLoadModels: true,
    }),
    RoutingModule,
    ChatsModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
