import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { packagesProviders } from './packages.provider';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService, ...packagesProviders]
})
export class PackagesModule {}
