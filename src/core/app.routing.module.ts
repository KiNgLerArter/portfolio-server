import { AuthModule } from '@features/auth/auth.module';
import { ChatModule } from '@features/chat/chat.module';
import { ChatDialogModule } from '@features/chat/dialog/chat-dialog.module';
import { ChatGroupModule } from '@features/chat/group/chat-group.module';
import { RolesModule } from '@features/roles/roles.module';
import { UsersModule } from '@features/users/users.module';
import { RouterModule } from '@nestjs/core';

RouterModule.register([
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
    children: [
      {
        path: 'dialog',
        module: ChatDialogModule,
      },
      {
        path: 'group',
        module: ChatGroupModule,
      },
    ],
  },
]);
