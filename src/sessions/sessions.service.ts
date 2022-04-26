import { Inject, Injectable } from '@nestjs/common';
import { Chat } from 'src/chats/entities/chat.entity';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SESSIONS_REPOSITORY')
    private sessionsRepository: typeof Session,
    @Inject('CHATS_REPOSITORY')
    private chatsRepository: typeof Chat,
  ) { }

  async createSession(customerId: number, driverId: number, deliveryId: number) {
    return await this.sessionsRepository.create({
      customerId: customerId,
      driverId: driverId,
      deliveryId: deliveryId,
    });
  }

  async deleteSession(deliveryId: number) {
    const session = await this.sessionsRepository.findOne({where: { deliveryId: deliveryId }})
    const chats = await this.chatsRepository.findAll({where: { sessionId: session.id }})
    await chats.forEach( async (chat) => {
      await chat.destroy();
    });
    return await session.destroy();
  }

  async getCustomerSession(customerId: number) {
    return await this.sessionsRepository.findAll({
      where: { customerId: customerId },
      include: [
        {
          model: Chat,
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ]
    });
  }

  async getDriverSession(driverId: number) {
    return await this.sessionsRepository.findAll({
      where: { driverId: driverId },
      include: [
        {
          model: Chat,
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ]
    });
  }
}
