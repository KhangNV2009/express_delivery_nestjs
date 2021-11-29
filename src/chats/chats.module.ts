import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { chatsProviders } from './chats.provider';

@Module({
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ...chatsProviders,
  ]
})
export class ChatsModule {}
