import { Message } from '@db-models/message.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EditMessageDto } from './dto/edit-message.dto';
import { SaveMessageDto } from './dto/save-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}

  async saveMessage(dto: SaveMessageDto): Promise<Message> {
    const message = await this.messageRepository.create(dto);
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    const message = await this.messageRepository.findByPk(id);
    message.destroy();

    await this.messageRepository.update(
      { repliedMessageId: null },
      { where: { repliedMessageId: id } },
    );
  }

  async editMessage({ id, body }: EditMessageDto): Promise<Message> {
    const message = await this.messageRepository.findByPk(id);
    message.update({ body });

    return message;
  }
}
