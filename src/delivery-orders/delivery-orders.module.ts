import { Module } from '@nestjs/common';
import { DeliveryOrdersService } from './delivery-orders.service';
import { DeliveryOrdersController } from './delivery-orders.controller';
import { deliveryOrdersProviders } from './delivery-orders.provider';

@Module({
  controllers: [DeliveryOrdersController],
  providers: [DeliveryOrdersService, ...deliveryOrdersProviders]
})
export class DeliveryOrdersModule {}
