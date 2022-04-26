import { Inject, Injectable } from '@nestjs/common';
import { DeliveryOrder } from 'src/delivery-orders/entities/delivery-order.entity';
import { CreateDeliveryHistoryDto } from './dto/create-delivery-history.dto';
import { DeliveryHistory } from './entities/delivery-history.entity';

@Injectable()
export class DeliveryHistoriesService {
  constructor(
    @Inject('DELIVERY_HISTORIES_REPOSITORY')
    private historiesRepository: typeof DeliveryHistory,
    @Inject('DELIVERY_ORDERS_REPOSITORY')
    private deliverisRepository: typeof DeliveryOrder,
  ) { }

  async createHistory(dto: CreateDeliveryHistoryDto) {
    return await this.historiesRepository.create(dto);
  }

  async findHistories(customerId: number) {
    const data = await this.historiesRepository.findAll({
      include: [
        {model: DeliveryOrder, where: {customerId: customerId}}
      ]
    });
    return data;
  }
}
