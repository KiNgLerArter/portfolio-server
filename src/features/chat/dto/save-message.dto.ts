class Message {
  readonly userId: number;
  readonly repliedMessageId?: number;
  readonly body: string;
  readonly created_at: number;
}

export class SaveUserMessageDto extends Message {
  readonly recipientId: number;
}

export class SaveGroupMessageDto extends Message {
  readonly groupId: number;
}
