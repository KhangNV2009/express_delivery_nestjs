import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { locationsProviders } from './locations.provider';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, ...locationsProviders]
})
export class LocationsModule {}
