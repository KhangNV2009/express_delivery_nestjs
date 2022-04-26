import { Module } from '@nestjs/common';
import { DeliveryOrdersService } from './delivery-orders.service';
import { DeliveryOrdersController } from './delivery-orders.controller';
import { deliveryOrdersProviders } from './delivery-orders.provider';
import { locationsProviders } from 'src/locations/locations.provider';
import { PackagesService } from 'src/packages/packages.service';
import { packagesProviders } from 'src/packages/packages.provider';
import { FirebaseMessaginService } from 'src/firebase-messaging/firebase-messaging.service';
import { appDeviceProviders } from 'src/app-device/app-device.provider';
import { deliveryHistoriesProviders } from 'src/delivery-histories/delivery-histories.provider';
import { SessionsService } from 'src/sessions/sessions.service';
import { sessionsProviders } from 'src/sessions/sessions.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';
import { ChatsService } from 'src/chats/chats.service';
import { ChatsModule } from 'src/chats/chats.module';
import { chatsProviders } from 'src/chats/chats.provider';
import { vehiclesProviders } from 'src/vehicles/vehicles.provider';

@Module({
  controllers: [DeliveryOrdersController],
  providers: [
    DeliveryOrdersService, 
    ...deliveryOrdersProviders,
    ...locationsProviders,
    PackagesService,
    ...packagesProviders,
    FirebaseMessaginService,
    ...appDeviceProviders,
    ...deliveryHistoriesProviders,
    SessionsService,
    ...sessionsProviders,
    UsersService,
    ...usersProviders,
    ChatsService,
    ...chatsProviders,
    ...vehiclesProviders,
  ],
})
export class DeliveryOrdersModule {}
