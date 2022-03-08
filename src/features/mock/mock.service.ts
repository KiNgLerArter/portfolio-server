import { ChatsService } from '@features/chats/chats.service';
import { RolesService } from '@features/roles/roles.service';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {
    constructor(private rolesService: RolesService, private usersService: UsersService, private chatsService: ChatsService) {}

    async fillDB(): Promise<void> {
        await this.rolesService.createMockRoles();
        await this.usersService.createMockUsers();
        await this.chatsService.createMockChats();
    }
}
