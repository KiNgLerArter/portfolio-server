import { Chat } from '@db-models/chat.model';
import { Message } from '@db-models/message.model';
import { User } from '@db-models/user.model';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatsService } from '../chats.service';
import { messageDto } from './types/message.type';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
    @InjectModel(Chat) private chatRepository: typeof Chat,
  ) {}

  async saveMessage(dto: messageDto.Save): Promise<Message> {
    const { chatId, repliedOnMessageId } = dto;
    const message = await this.messageRepository.create(dto);
    if (repliedOnMessageId !== undefined && repliedOnMessageId !== null) {
      const repliedMessage = await this.messageRepository.findByPk(
        repliedOnMessageId,
      );
      await repliedMessage.$add('repliedMessages', message);
    }
    const chat = await this.chatRepository.findByPk(chatId);

    await chat.$add('messages', message);

    const fullMessage = await this.messageRepository.findByPk(message.id, {
      include: [User],
    });
    return fullMessage;
  }

  async deleteMessage(id: number): Promise<void> {
    const message = await this.messageRepository.findByPk(id);
    message.destroy();
  }

  async editMessage({ id, body }: messageDto.Edit): Promise<Message> {
    const message = await this.messageRepository.findByPk(id);
    message.update({ body });

    return message;
  }
}
