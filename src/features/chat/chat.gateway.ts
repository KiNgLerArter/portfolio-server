import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  SaveGroupMessageDto,
  SaveUserMessageDto,
} from './dto/save-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() group: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log(`WebSocket INITTED`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messageToUser')
  async handleMessageToUser(
    client: Socket,
    data: SaveUserMessageDto,
  ): Promise<WsResponse<SaveUserMessageDto>> {
    return { event: 'messageFromClient', data };
  }

  @SubscribeMessage('messageToGroup')
  async handleMessageToGroup(
    @MessageBody() data: SaveGroupMessageDto,
  ): Promise<WsResponse<SaveGroupMessageDto>> {
    // this.group.emit('messageFromGroup', data);
    return { event: 'messageFromGroup', data };
  }
}
