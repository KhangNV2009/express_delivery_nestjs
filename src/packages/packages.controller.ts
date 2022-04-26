import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { Auth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.guard';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Auth(RoleType.CUSTOMER)
  @Post()
  createPackage(@Body() dto: CreatePackageDto) {
    return this.packagesService.createPackage(dto);
  }

  @Auth(RoleType.CUSTOMER)
  @Get()
  findPackages(@Query('state') state: number, @Query('warehouseId') warehouseId: number) {
    return this.packagesService.findPackageByState(state, warehouseId);
  }
}
