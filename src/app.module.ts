import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { DatabaseModule } from './database/database.module';
import { AllExceptionModule } from './filter-exception/all-exception.module';
import { TransformModule } from './interceptors/transform.module';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';
import { DeliveryReportsModule } from './delivery-reports/delivery-reports.module';
import { AppDeviceModule } from './app-device/app-device.module';
import { PackagesModule } from './packages/packages.module';
import { DeliveryOrdersModule } from './delivery-orders/delivery-orders.module';
import { DeliveryHistoriesModule } from './delivery-histories/delivery-histories.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    WarehousesModule,
    DatabaseModule,
    TransformModule,
    RolesModule,
    SessionsModule,
    ChatsModule,
    DeliveryOrdersModule,
    DeliveryHistoriesModule,
    DeliveryReportsModule,
    AppDeviceModule,
    PackagesModule,
    // AllExceptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
