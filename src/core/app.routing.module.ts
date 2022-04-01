import { RouterModule } from '@nestjs/core';
import { AuthModule } from '@features/auth/auth.module';
import { ChatsModule } from '@features/chats/chats.module';
import { RolesModule } from '@features/roles/roles.module';
import { UsersModule } from '@features/users/users.module';
import { MessagesModule } from '@features/chats/messages/messages.module';
import { MockModule } from '@features/mock/mock.module';

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
    module: ChatsModule,
    children: [
      {
        path: 'messages',
        module: MessagesModule,
      },
    ],
  },
  {
    path: 'mock',
    module: MockModule,
  },
]);
