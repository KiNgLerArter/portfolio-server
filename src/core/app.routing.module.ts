import { RouterModule } from '@nestjs/core';
import { AuthModule } from '@features/auth/auth.module';
import { ChatModule } from '@features/chat/chat.module';
import { RolesModule } from '@features/roles/roles.module';
import { UsersModule } from '@features/users/users.module';

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
    path: 'chat',
    module: ChatModule,
    // children: [
    //   {
    //     path: 'dialog',
    //     module: ChatDialogModule,
    //   },
    //   {
    //     path: 'group',
    //     module: ChatGroupModule,
    //   },
    // ],
  },
]);
