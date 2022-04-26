import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { chatsProviders } from './chats.provider';
import { ChatGateway } from './chats.gateway';

@Module({
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ...chatsProviders,
    ChatGateway,
  ]
})
export class ChatsModule { }
