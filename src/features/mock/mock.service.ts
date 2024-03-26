import { Chat } from '@db-models/chat.model';
import { UsersChats } from '@db-models/combined/users-chats.model';
import { UsersRoles } from '@db-models/combined/users-roles.model';
import { Message } from '@db-models/message.model';
import { Role } from '@db-models/role.model';
import { Token } from '@db-models/token.model';
import { User } from '@db-models/user.model';
import { AuthService } from '@features/auth/auth.service';
import { ChatsService } from '@features/chats/chats.service';
import { RolesService } from '@features/roles/roles.service';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
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
    private authService: AuthService,
    private chatsService: ChatsService,
  ) {}

  // onApplicationBootstrap() {
  //   this.fillDB();
  // }

  async fillDB(): Promise<void> {
    await this.clearDB();
    await this.rolesService.createRoles(mockRoles);
    await this.authService.registerUsers(mockUsers);
    await this.chatsService.createChats(mockChats);
  }

  private async clearDB(): Promise<any> {
    await this.usersChatsRepo.sync({
      force: true,
    });
    await this.usersRolesRepo.sync({
      force: true,
    });
    await this.usersRepo.sync({
      force: true,
    });
    await this.rolesRepo.sync({
      force: true,
    });
    await this.tokensRepo.sync({
      force: true,
    });
    await this.messagesRepo.sync({
      force: true,
    });
    await this.chatsRepo.sync({
      force: true,
    });
  }
}
