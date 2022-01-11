export namespace saveChatMessageDto {
  export class FE {
    readonly chatId: number;
    readonly msgOwnerId: number;
    readonly body: string;
    readonly repliedMessageId?: number;
    readonly sent_time: number;
  }

  export class BE {}
}
