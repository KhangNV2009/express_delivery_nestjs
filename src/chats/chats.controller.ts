import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { PagingDto } from './dto/paging.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {
  }
  @Get(':sessionId')
  getChats(@Param('sessionId') sessionId: number, @Query() query: PagingDto) {
    return this.chatsService.getChats(sessionId, query);
  }

  @Post()
  createCustomerChat(@Body() dto: CreateChatDto) {
    return this.chatsService.createChatMessage(dto);
  }
}
