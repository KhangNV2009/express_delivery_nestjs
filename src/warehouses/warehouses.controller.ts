import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
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
  @Put(':id')
  async createWareHouse(
    @Param('id') id: number,
    @Body() body: CreateWarehouseDto,
    @Req() request: Express.Request,
  ): Promise<any> {
    const user = request.user as JwtPayload;
    body.customerId = user.id;
    await this.warehousesService.updateWarehouse(body, id);
    return 'Create successfully';
  }

  @Auth(RoleType.CUSTOMER)
  @Post()
  async updateWareHouse(
    @Body() body: CreateWarehouseDto,
    @Req() request: Express.Request,
  ): Promise<any> {
    const user = request.user as JwtPayload;
    body.customerId = user.id;
    await this.warehousesService.createWarehouse(body);
    return 'Create successfully';
  }

  @Auth(RoleType.CUSTOMER)
  @Delete(':id')
  async deleteWareHouse(@Param() params,): Promise<any> {
    await this.warehousesService.deleteWarehouse(params.id);
    return "remove successfully";
  }
}
