import { Injectable } from '@nestjs/common';
import { CreateDeliveryHistoryDto } from './dto/create-delivery-history.dto';
import { UpdateDeliveryHistoryDto } from './dto/update-delivery-history.dto';

@Injectable()
export class DeliveryHistoriesService {
  create(createDeliveryHistoryDto: CreateDeliveryHistoryDto) {
    return 'This action adds a new deliveryHistory';
  }

  findAll() {
    return `This action returns all deliveryHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryHistory`;
  }

  update(id: number, updateDeliveryHistoryDto: UpdateDeliveryHistoryDto) {
    return `This action updates a #${id} deliveryHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryHistory`;
  }
}
