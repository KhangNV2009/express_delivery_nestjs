import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { warehousesProviders } from './warehouses.provider';
import { LocationsService } from 'src/locations/locations.service';
import { locationsProviders } from 'src/locations/locations.provider';
import { PackagesService } from 'src/packages/packages.service';
import { packagesProviders } from 'src/packages/packages.provider';

@Module({
  controllers: [WarehousesController],
  providers: [
    WarehousesService, 
    ...warehousesProviders,
    LocationsService,
    ...locationsProviders,
    PackagesService,
    ...packagesProviders,
  ]
})
export class WarehousesModule {}
