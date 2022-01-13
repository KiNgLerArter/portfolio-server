export class SaveMessageDto {
  readonly chatId: string;
  readonly msgOwnerId: number;
  readonly body: string;
  readonly repliedMessageId?: number;
  readonly sentDate: string;
}
