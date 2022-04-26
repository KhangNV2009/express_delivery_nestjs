import { Module } from '@nestjs/common';
import { DeliveryReportsService } from './delivery-reports.service';
import { DeliveryReportsController } from './delivery-reports.controller';
import { deliveryReportsProviders } from './delivery-reports.provider';
import { deliveryOrdersProviders } from 'src/delivery-orders/delivery-orders.provider';
import { FirebaseMessaginService } from 'src/firebase-messaging/firebase-messaging.service';
import { appDeviceProviders } from 'src/app-device/app-device.provider';

@Module({ 
  controllers: [DeliveryReportsController],
  providers: [
    DeliveryReportsService, 
    ...deliveryReportsProviders,
    ...deliveryOrdersProviders,
    FirebaseMessaginService,
    ...appDeviceProviders,
  ]
})
export class DeliveryReportsModule {}
