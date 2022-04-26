import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { DeliveryHistory } from 'src/delivery-histories/entities/delivery-history.entity';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { Location } from 'src/locations/entities/location.entity';
import { Package } from 'src/packages/entities/package.entity';
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
    let { name, customerId, lat, lng, street, ward, district, city, } = data;
    const locationJson: CreateLocationDto = {
      lat: Number(lat),
      lng: Number(lng),
      street: street,
      ward: ward,
      district: district,
      city: city,
    }
    const location = await this.locationsRepository.create(locationJson);

    return await this.warehousesRepository.create({
      name,
      customerId,
      locationId: location.id,
    });
  }
  async updateWarehouse(data: CreateWarehouseDto, warehouseId: number): Promise<any> {
    let { name, customerId, lat, lng, street, ward, district, city, } = data;

    const warehouse = await this.warehousesRepository.findOne({ where: { id: warehouseId } });

    await this.locationsRepository.update({
      lat,
      lng,
      street,
      ward,
      district,
      city,
    }, {
      where: { id: warehouse.locationId, }
    });

    return await this.warehousesRepository.update(
      {
        name,
      },
      {
        where: { id: warehouseId }
      }
    );

  }
  async getAllWarehouses(id: number): Promise<any> {
    return await this.warehousesRepository.findAll({ where: { customerId: id }, include: [Location] });
  }
  async getWarehouseDetail(id: number): Promise<any> {
    return await this.warehousesRepository.findOne({
      where: {
        id: id
      },
      include: [Location, Package]
    });
  }
  async deleteWarehouse(id: number): Promise<any> {
    return await this.warehousesRepository.destroy({ where: { id: id } });
  }
}
