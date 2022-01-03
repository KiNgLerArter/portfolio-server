class Message {
  readonly senderId: number;
  readonly repliedMessageId: number;
  readonly body: string;
  readonly sent_time: number;
}

export class SaveDialogMessageDto extends Message {
  readonly dialogId: number;
}

export class SaveGroupMessageDto extends Message {
  readonly groupId: number;
}
