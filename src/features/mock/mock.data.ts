import { RolesList } from '@common/types/roles.model';
import { CreateChatDto } from '@features/chats/dtos/create-chat.dto';
import { CreateRoleDto } from '@features/roles/dto/create-role.dto';
import { userDto } from '@features/users/dtos/create-user.dto';

export const mockUsers: (userDto.Extended & { roles: RolesList[] })[] = [
  {
    nickname: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    roles: [RolesList.ADMIN],
  },
  {
    nickname: 'admin1',
    email: 'admin1@admin1.com',
    password: 'admin1',
    roles: [RolesList.ADMIN],
  },
  {
    nickname: 'admin2',
    email: 'admin2@admin2.com',
    password: 'admin2',
    roles: [RolesList.ADMIN],
  },
  {
    nickname: 'moder',
    email: 'moder@moder.com',
    password: 'moder',
    roles: [RolesList.MODER],
  },
  {
    nickname: 'moder1',
    email: 'moder1@moder1.com',
    password: 'moder1',
    roles: [RolesList.MODER],
  },
  {
    nickname: 'user',
    email: 'user@user.com',
    password: 'user',
    roles: [RolesList.USER],
  },
  {
    nickname: 'user1',
    email: 'user1@user1.com',
    password: 'user1',
    roles: [RolesList.USER],
  },
  {
    nickname: 'user2',
    email: 'user2@user2.com',
    password: 'user2',
    roles: [RolesList.USER],
  },
];

export const mockRoles: CreateRoleDto[] = [
  { value: 'user', description: 'standard user' },
  { value: 'moder', description: 'moderator' },
  { value: 'admin', description: 'administrator' },
];

export const mockChats: CreateChatDto[] = [
  {
    name: 'admin-chat',
    usersIds: [1, 2, 3],
  },
  {
    name: 'moder-chat',
    usersIds: [4, 5],
  },
  {
    name: 'user-chat',
    usersIds: [6, 7, 8],
  },
  {
    name: 'global-chat',
  },
  {
    name: 'Elite Chat',
    usersIds: [1, 2, 3, 4, 5],
  },
];
