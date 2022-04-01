export class SaveMessageDto {
  readonly chatId: string;
  readonly ownerId: number;
  readonly body: string;
  readonly repliedOnMessageId?: number;
  readonly sentDate: string;
}
