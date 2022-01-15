import { RouterModule } from '@nestjs/core';
import { AuthModule } from '@features/auth/auth.module';
import { ChatModule } from '@features/chat/chats.module';
import { RolesModule } from '@features/roles/roles.module';
import { UsersModule } from '@features/users/users.module';
import { MessageModule } from '@features/chat/message/messages.module';

export const RoutingModule = RouterModule.register([
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'roles',
    module: RolesModule,
  },
  {
    path: 'users',
    module: UsersModule,
  },
  {
    path: 'chats',
    module: ChatModule,
    children: [
      {
        path: 'message',
        module: MessageModule,
      },
    ],
  },
]);
