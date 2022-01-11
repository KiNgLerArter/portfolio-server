import { Injectable } from '@nestjs/common';
import { saveChatMessageDto } from '../dto/save-chat-message.dto';

@Injectable()
export class MessageService {
  async saveMessage(message: saveChatMessageDto.FE) {}
  async deleteMessage() {}
  async editMessage() {}
}
