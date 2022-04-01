import { Chat } from '@db-models/chat.model';
import { Message } from '@db-models/message.model';
import { UsersService } from '@features/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatsService } from '../chats.service';
import { EditMessageDto } from './dtos/edit-message.dto';
import { SaveMessageDto } from './dtos/save-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
    @InjectModel(Chat) private chatRepository: typeof Chat,
  ) {}

  async saveMessage(dto: SaveMessageDto): Promise<Message> {
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

    console.log('[😈😈MESSAGE😈😈]:', message);
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    const message = await this.messageRepository.findByPk(id);
    message.destroy();
  }

  async editMessage({ id, body }: EditMessageDto): Promise<Message> {
    const message = await this.messageRepository.findByPk(id);
    message.update({ body });

    return message;
  }
}
