import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModule } from 'src/features/chat/chat.module';
import { UsersModule } from './features/users/users.module';
import { User } from './models/user.model';
import { RolesModule } from './features/roles/roles.module';
import { Role } from './models/role.model';
import { UserRoles } from '@models/combined/user-roles.model';
import { AuthModule } from './features/auth/auth.module';
import { ChatGroup } from '@models/chat-group.model';
import { UserChatGroups } from '@models/combined/user-chat-groups.model';

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
      models: [User, Role, ChatGroup, UserRoles, UserChatGroups],
      autoLoadModels: true,
    }),
    ChatModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
