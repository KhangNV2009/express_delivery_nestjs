import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatsService: ChatsService) {}
  
  @WebSocketServer() server: Server;
  
  private logger: Logger = new Logger('ChatGateWay');

  @SubscribeMessage('text')
  async handleMessage(client: Socket, dto: CreateChatDto) {
    const chat = await this.chatsService.createChatMessage(dto);
    this.server.emit('text', chat);
  }

  @SubscribeMessage('media')
  async handleMedia(client: Socket, dto: CreateChatDto) {
    await this.chatsService.createChatMedia(dto);
    this.server.emit('media', dto);
  }

  afterInit(server: any) {
    this.logger.log('Init');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client connect');
  }
  handleDisconnect(client: any) {
    this.logger.log('Client disconnect');
  }
}