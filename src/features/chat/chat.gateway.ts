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
import { saveChatMessageDto } from './dto/save-chat-message.dto';
import { MessageService } from './message/message.service';

@WebSocketGateway({ cors: true, namespace: 'chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  private chatLogger: Logger = new Logger('Chat');

  constructor(private messageService: MessageService) {}

  afterInit(server: Server) {
    this.logger.log(`WebSocket INITTED`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messageToChat')
  async handleMessageToUser(client: Socket, data: saveChatMessageDto.FE) {
    this.chatLogger.log(`messageToChat: ${data.body}`);
    await this.messageService.saveMessage(data);
    this.server.to(`chat-${data.chatId}`).emit('messageFromChat', data);
  }
}
