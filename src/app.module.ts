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

@Module({
  imports: [
    UsersModule,
    WarehousesModule,
    DatabaseModule,
    TransformModule,
    RolesModule,
    // AllExceptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
