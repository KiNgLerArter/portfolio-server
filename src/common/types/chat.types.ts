import { Message } from '@db-models/message.model';
import { User } from '@db-models/user.model';

export enum ChatTypes {
  DIALOG = 'dialog',
  GROUP = 'group',
}

export const msgsPreviewLimit = 25;

export type LimitedArray<
  T,
  L extends number,
  TObj = [T, ...Array<T>],
> = TObj & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};

export type ChatPreviewMessages = LimitedArray<Message, 25>;

export class ChatPreview {
  id: string;
  name: string;
  users: User[];
  messages?: ChatPreviewMessages;

  constructor({
    id,
    name,
    users,
    messages,
  }: {
    id: string;
    name: string;
    users: User[];
    messages?: Message[];
  }) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.setMessages(messages);
  }

  setMessages(msgs: Message[]): void {
    if (msgs.length > msgsPreviewLimit) {
      msgs.slice(-msgsPreviewLimit);
    }
    this.messages = msgs as ChatPreviewMessages;
  }
}
