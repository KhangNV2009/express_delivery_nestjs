import { Module } from '@nestjs/common';
import { DeliveryHistoriesService } from './delivery-histories.service';
import { DeliveryHistoriesController } from './delivery-histories.controller';
import { deliveryHistoriesProviders } from './delivery-histories.provider';
import { deliveryOrdersProviders } from 'src/delivery-orders/delivery-orders.provider';

@Module({
  controllers: [DeliveryHistoriesController],
  providers: [
    DeliveryHistoriesService, 
    ...deliveryHistoriesProviders,
    ...deliveryOrdersProviders,
  ]
})
export class DeliveryHistoriesModule { }
