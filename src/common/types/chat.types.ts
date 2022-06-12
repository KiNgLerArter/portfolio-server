import { Message } from '@db-models/message.model';
import { SimplifiedUser } from './user.types';

export enum ChatTypes {
  DIALOG = 'dialog',
  GROUP = 'group',
}

export class ChatPreview {
  id: string;
  name: string;
  lastMessage: {
    body: Message['body'];
    owner: SimplifiedUser;
  };

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }
}
