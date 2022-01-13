import { Chat } from '@db-models/chat.model';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChatDto } from './dto/create-chat.dto';
import { EditChatDto } from './dto/edit-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatRepository: typeof Chat,
    private usersService: UsersService,
  ) {}

  async createChat({ name, userIds }: CreateChatDto): Promise<Chat> {
    const users = await this.usersService.getUsersByIds(userIds);
    const chat = await this.chatRepository.create({ name, users });

    return chat;
  }

  async editChat({ id, name }: EditChatDto): Promise<Chat> {
    const chat = await this.chatRepository.findByPk(id);
    chat.update({ name });

    return chat;
  }

  async deleteChat(id: string): Promise<void> {
    const chat = await this.chatRepository.findByPk(id);
    chat.destroy();
  }
}
