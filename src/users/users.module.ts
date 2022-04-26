import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { LocationsService } from 'src/locations/locations.service';
import { locationsProviders } from 'src/locations/locations.provider';
import { SessionsService } from 'src/sessions/sessions.service';
import { sessionsProviders } from 'src/sessions/sessions.provider';
import { ChatsService } from 'src/chats/chats.service';
import { chatsProviders } from 'src/chats/chats.provider';
import { PackagesService } from 'src/packages/packages.service';
import { packagesProviders } from 'src/packages/packages.provider';
import { DeliveryHistory } from 'src/delivery-histories/entities/delivery-history.entity';
import { deliveryHistoriesProviders } from 'src/delivery-histories/delivery-histories.provider';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { vehiclesProviders } from 'src/vehicles/vehicles.provider';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';
import { MulterModule } from '@nestjs/platform-express';
import { AccessTokenStrategy } from 'src/auth/strategies';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: "12d" },
    }),
    MulterModule.registerAsync({
      imports: [],
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RolesGuard,
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
    DeliveryHistory,
    ...deliveryHistoriesProviders,
    VehiclesService,
    ...vehiclesProviders,
  ]
})
export class UsersModule {}
