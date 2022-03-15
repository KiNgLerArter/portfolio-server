import { Chat } from '@db-models/chat.model';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateChatDto } from './dtos/create-chat.dto';
import { EditChatDto } from './dtos/edit-chat.dto';
import { GetFilteredChatsDto } from './dtos/get-chats.dto';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat) private chatRepository: typeof Chat) {}

  async getChats(dto: GetFilteredChatsDto): Promise<Chat[]> {
    const chats = await (dto
      ? this.chatRepository.findAll({
          where: { name: { [Op.substring]: dto.name } },
          include: { all: true },
        })
      : this.chatRepository.findAll({ include: { all: true } }));
    return chats;
  }

  async createChat({ name, usersIds }: CreateChatDto): Promise<Chat> {
    const chat = await this.chatRepository.create({ name });
    if (usersIds) {
      chat?.$add('users', usersIds);
    }

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

  async createChats(chats: CreateChatDto[]) {
    for (let i = 0; i < chats.length; i++) {
      await this.createChat(chats[i]);
    }
  }
}
