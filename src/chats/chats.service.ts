import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { PagingDto } from './dto/paging.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
    constructor(
        @Inject('CHATS_REPOSITORY')
        private chatsRepository: typeof Chat,
    ) { }

    async createChatMessage(dto: CreateChatDto) {
        return await this.chatsRepository.create(dto);
    }

    async createChatMedia(dto: CreateChatDto) {
        return await this.chatsRepository.create(dto);
    }

    async getChats(sessionId: number, query: PagingDto) {
        const offset = (query.page - 1) * query.limit;
        return await this.chatsRepository.findAndCountAll({
            where: { sessionId: sessionId },
            order: [['createdAt', 'ASC']],
            limit: query.limit,
            offset: offset,
            include: [User]
        });
    }
}
