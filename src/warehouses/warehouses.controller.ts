import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Auth } from 'src/jwt/auth.decorator';
import { JwtPayload } from 'src/jwt/auth.payload';
import { RoleType } from 'src/jwt/roles.guard';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {
  }

  @Auth(RoleType.CUSTOMER)
  @Get()
  async getWarehouses(@Req() request: Express.Request,): Promise<any> {
    const user = request.user as JwtPayload;
    return await this.warehousesService.getAllWarehouses(user.id);
  }

  @Auth(RoleType.CUSTOMER)
  @Get(':id')
  async getWarehouseDetail(
    @Param() params,
  ): Promise<any> {
    return await this.warehousesService.getWarehouseDetail(params.id);
  }
  @Auth(RoleType.CUSTOMER)
  @Post()
  async createWareHouse(@Body() body: CreateWarehouseDto): Promise<any> {
    return await this.warehousesService.createWarehouse(body);
  } 

  @Auth(RoleType.CUSTOMER)
  @Delete(':id')
  async deleteWareHouse(@Param() params,): Promise<any> {
    return await this.warehousesService.deleteWarehouse(params.id);
  }
}
