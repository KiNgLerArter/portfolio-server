import { Chat } from '@db-models/chat.model';
import { UsersChats } from '@db-models/combined/users-chats.model';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { Message } from '@db-models/message.model';
import { Role } from '@db-models/role.model';
import { Token } from '@db-models/token.model';
import { User } from '@db-models/user.model';
import { ChatsService } from '@features/chats/chats.service';
import { RolesService } from '@features/roles/roles.service';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { mockChats, mockRoles, mockUsers } from './mock.data';

@Injectable()
export class MockService {
  constructor(
    @InjectModel(UsersChats) private usersChatsRepo: typeof UsersChats,
    @InjectModel(UsersRoles) private usersRolesRepo: typeof UsersRoles,
    @InjectModel(Role) private rolesRepo: typeof Role,
    @InjectModel(User) private usersRepo: typeof User,
    @InjectModel(Chat) private chatsRepo: typeof Chat,
    @InjectModel(Token) private tokensRepo: typeof Token,
    @InjectModel(Message) private messagesRepo: typeof Message,
    private rolesService: RolesService,
    private usersService: UsersService,
    private chatsService: ChatsService,
  ) {}

  async fillDB(): Promise<void> {
    await this.clearDB();
    await this.rolesService.createRoles(mockRoles);
    await this.usersService.createUsers(mockUsers);
    await this.chatsService.createChats(mockChats);
  }

  private async clearDB(): Promise<any> {
    await this.usersChatsRepo.truncate({
      cascade: true,
    });
    await this.usersRolesRepo.truncate({
      cascade: true,
    });
    await this.usersRepo.truncate({
      cascade: true,
    });
    await this.rolesRepo.truncate({
      cascade: true,
    });
    await this.tokensRepo.truncate({
      cascade: true,
    });
    await this.messagesRepo.truncate({
      cascade: true,
    });
    await this.chatsRepo.truncate({
      cascade: true,
    });
  }
}
