import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages/messages.service';
import { messageDto } from './messages/types/message.type';

@WebSocketGateway({ cors: true, namespace: 'chats' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  private chatLogger: Logger = new Logger('Chat');

  constructor(private messagesService: MessagesService) {}

  afterInit(server: Server) {
    this.logger.log(`WebSocket INITTED`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('[😈😈client connected😈😈]:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('[😈😈client disconnected😈😈]:', client.id);
  }

  @SubscribeMessage('join chats')
  async onJoinChats(client: Socket, chatIds: string[]) {
    console.log('[😈😈chatIds😈😈]:', chatIds);
    client.join(chatIds);
  }

  @SubscribeMessage('leave chats')
  async onLeaveChats(client: Socket, chatIds: string[]) {
    chatIds.forEach((id) => {
      client.leave(id);
    });
  }

  @SubscribeMessage('send message')
  async onSendMessage(client: Socket, message: messageDto.Save) {
    const savedMessage = await this.messagesService.saveMessage(message);
    console.log(
      '[😈😈message.chatId, savedMessage😈😈]:',
      message.chatId,
      savedMessage,
    );
    this.server.to(message.chatId).emit('receive message', savedMessage);
  }

  @SubscribeMessage('delete message')
  async onDeleteMessage(client: Socket, message: messageDto.Delete) {
    await this.messagesService.deleteMessage(message.id);
    console.log(
      '[😈😈message.chatId, deletedMessage😈😈]:',
      message.chatId,
      message,
    );
    this.server.to(message.chatId).emit('delete message', message);
  }
}
