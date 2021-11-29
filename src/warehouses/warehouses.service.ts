import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { DeliveryHistory } from 'src/delivery-histories/entities/delivery-history.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehousesService {
  constructor(
    @Inject('LOCATIONS_REPOSITORY')
    private locationsRepository: typeof Location,
    @Inject('PACKAGES_REPOSITORY')
    private deliveryHistoriesRepository: typeof DeliveryHistory,
    @Inject('WAREHOUSES_REPOSITORY')
    private warehousesRepository: typeof Warehouse,
  ) { }
  async createWarehouse(data: CreateWarehouseDto): Promise<any> {
    const { name, customerId, lat, lng, street, ward, district, city, } = data;
    const location = await this.locationsRepository.create({
      lat,
      lng,
      street,
      ward,
      district,
      city,
    });

    return await this.warehousesRepository.create({
      name,
      customerId,
      locationId: location.id,
    });
  }
  // TODO: update warehouse
  async updateWarehouse(): Promise<any> {

  }
  async getAllWarehouses(id: number): Promise<any> {
    return await this.warehousesRepository.findAll({ where: { customerId: id } });
  }
  async getWarehouseDetail(id: number): Promise<any> {
    return await this.warehousesRepository.findOne({
      where: {
        id: id
      }
    });
  }
  async deleteWarehouse(id: number): Promise<any> {
    return await this.warehousesRepository.destroy({ where: { id: id } });
  }
}
