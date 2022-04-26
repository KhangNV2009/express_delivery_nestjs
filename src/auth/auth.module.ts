import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { chatsProviders } from 'src/chats/chats.provider';
import { ChatsService } from 'src/chats/chats.service';
import { deliveryHistoriesProviders } from 'src/delivery-histories/delivery-histories.provider';
import { DeliveryHistoriesService } from 'src/delivery-histories/delivery-histories.service';
import { deliveryOrdersProviders } from 'src/delivery-orders/delivery-orders.provider';
import { DeliveryOrdersService } from 'src/delivery-orders/delivery-orders.service';
import { deliveryReportsProviders } from 'src/delivery-reports/delivery-reports.provider';
import { locationsProviders } from 'src/locations/locations.provider';
import { LocationsService } from 'src/locations/locations.service';
import { packagesProviders } from 'src/packages/packages.provider';
import { PackagesService } from 'src/packages/packages.service';
import { sessionsProviders } from 'src/sessions/sessions.provider';
import { SessionsService } from 'src/sessions/sessions.service';
import { usersProviders } from 'src/users/users.provider';
import { UsersService } from 'src/users/users.service';
import { vehiclesProviders } from 'src/vehicles/vehicles.provider';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        UsersService,
        ...usersProviders,
        LocationsService,
        ...locationsProviders,
        SessionsService,
        ...sessionsProviders,
        ChatsService,
        ...chatsProviders,
        PackagesService,
        ...packagesProviders,
        DeliveryHistoriesService,
        ...deliveryHistoriesProviders,
        VehiclesService,
        ...vehiclesProviders,
        DeliveryOrdersService,
        ...deliveryOrdersProviders,
    ],
})
export class AuthModule { }