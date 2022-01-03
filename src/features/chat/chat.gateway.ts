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
import { ChatDialogService } from './dialog/chat-dialog.service';
import {
  SaveDialogMessageDto,
  SaveGroupMessageDto,
} from './dto/save-message.dto';
import { ChatGroupService } from './group/chat-group.service';

@WebSocketGateway({ cors: true, namespace: 'chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  private dialogLogger: Logger = new Logger('ChatDialog');
  private groupLogger: Logger = new Logger('ChatGroup');

  constructor(
    private chatDialogService: ChatDialogService,
    private chatGroupService: ChatGroupService,
  ) {}

  afterInit(server: Server) {
    this.logger.log(`WebSocket INITTED`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messageToDialog')
  async handleMessageToUser(client: Socket, data: SaveDialogMessageDto) {
    this.dialogLogger.log(`messageToDialog: ${data.body}`);
    await this.chatDialogService.saveMessage(data);
    this.server.to(`dialog-${data.dialogId}`).emit('messageFromDialog', data);
  }

  @SubscribeMessage('messageToGroup')
  async handleMessageToGroup(@MessageBody() data: SaveGroupMessageDto) {
    this.groupLogger.log(`messageToGroup: ${data.body}`);
    this.server.to(`group-${data.groupId}`).emit('messageFromGroup', data);
  }
}
