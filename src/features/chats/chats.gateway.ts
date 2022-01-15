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
import { SaveMessageDto } from './messages/dto/save-message.dto';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway({ cors: true, namespace: 'chat' })
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
    console.log('[client connected]:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('[client disconnected]:', client.id);
  }

  @SubscribeMessage('messageToChat')
  async handleMessageToUser(client: Socket, data: SaveMessageDto) {
    this.chatLogger.log(`messageToChat: ${data.body}`);
    await this.messagesService.saveMessage(data);
    this.server.to(`chat-${data.chatId}`).emit('messageFromChat', data);
  }
}
