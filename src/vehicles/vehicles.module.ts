import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { vehiclesProviders } from './vehicles.provider';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, ...vehiclesProviders]
})
export class VehiclesModule {}
