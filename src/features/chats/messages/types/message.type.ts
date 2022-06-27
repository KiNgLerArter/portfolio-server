import { Message } from '@db-models/message.model';

export namespace messageDto {
  export type Edit = Readonly<{
    id: number;
    body: string;
  }>;

  export type Save = Readonly<{
    chatId: string;
    ownerId: number;
    body: string;
    repliedOnMessageId?: number;
    sentDate: string;
  }>;

  export type Delete = Readonly<Message>;
}
