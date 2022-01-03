import { Injectable } from '@nestjs/common';
import { SaveGroupMessageDto } from '../dto/save-message.dto';

@Injectable()
export class ChatGroupService {
  constructor() {}

  async saveMessage(data: SaveGroupMessageDto) {}
}
