import { Injectable } from '@nestjs/common';
import { SaveDialogMessageDto } from '../dto/save-message.dto';

@Injectable()
export class ChatDialogService {
  constructor() {}

  async saveMessage(data: SaveDialogMessageDto) {}
}
