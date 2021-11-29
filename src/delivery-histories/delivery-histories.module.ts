import { Module } from '@nestjs/common';
import { DeliveryHistoriesService } from './delivery-histories.service';
import { DeliveryHistoriesController } from './delivery-histories.controller';
import { deliveryHistoriesProviders } from './delivery-histories.provider';

@Module({
  controllers: [DeliveryHistoriesController],
  providers: [DeliveryHistoriesService, ...deliveryHistoriesProviders]
})
export class DeliveryHistoriesModule { }
