import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { sessionsProviders } from './sessions.provider';
import { ChatsService } from 'src/chats/chats.service';
import { chatsProviders } from 'src/chats/chats.provider';

@Module({
  controllers: [SessionsController],
  providers: [
    SessionsService,
    ...sessionsProviders,
    ChatsService,
    ...chatsProviders,
  ]
})
export class SessionsModule { }
