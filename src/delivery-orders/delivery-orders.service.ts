import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { DeliveryHistory } from 'src/delivery-histories/entities/delivery-history.entity';
import { FCMDto } from 'src/firebase-messaging/dto/fcmDto.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { Location } from 'src/locations/entities/location.entity';
import { Package } from 'src/packages/entities/package.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';
import { DeliveryOrder } from './entities/delivery-order.entity';

@Injectable()
export class DeliveryOrdersService {
  constructor(
    @Inject('DELIVERY_ORDERS_REPOSITORY')
    private deliverisRepository: typeof DeliveryOrder,
    @Inject('LOCATIONS_REPOSITORY')
    private locationsRepository: typeof Location,
    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: typeof Package,
    @Inject('DELIVERY_HISTORIES_REPOSITORY')
    private historiesRepository: typeof DeliveryHistory,
  ) { }

  async createDelivery(dto: CreateDeliveryOrderDto, payload: FCMDto) {

    const locationDto: CreateLocationDto = {
      lat: dto.lat,
      lng: dto.lng,
      street: dto.street,
      ward: dto.ward,
      district: dto.district,
      city: dto.city,
    }
    const location = await this.locationsRepository.create(locationDto);

    const delivery = await this.deliverisRepository.create({
      customerId: dto.customerId,
      warehouseId: dto.warehouseId,
      state: 2,
      locationId: location.id,
    });

    await this.packagesRepository.update(
      { state: 2 },
      {
        where: { id: dto.packageId }
      });

    await this.historiesRepository.create({
      deliveryId: delivery.id,
      title: payload.title,
      description: payload.body,

    });
  }

  async confirmDelivery(
    customerId: number,
    warehouseId: number,
    deliveryId: number,
    driverId: number,
    packageId: number,
    payload: FCMDto,
  ) {
    await this.deliverisRepository.update({
      state: 3,
      customerId: driverId,
    }, {
      where: {
        [Op.and]: {
          id: deliveryId,
          state: 2,
          customerId: customerId,
          warehouseId: warehouseId,
        }
      }
    });

    await this.packagesRepository.update(
      { state: 3 },
      {
        where: { id: packageId }
      });

    await this.historiesRepository.create({
      deliveryId: deliveryId,
      title: payload.title,
      description: payload.body,

    });
  }

  async inTransitDelivery(
    warehouseId: number,
    deliveryId: number,
    driverId: number,
    packageId: number,
    payload: FCMDto,
  ) {
    await this.deliverisRepository.update({
      state: 4,
    }, {
      where: {
        [Op.and]: {
          id: deliveryId,
          state: 3,
          customerId: driverId,
          warehouseId: warehouseId,
        }
      }
    });

    await this.packagesRepository.update(
      { state: 4 },
      {
        where: { id: packageId }
      });

    await this.historiesRepository.create({
      deliveryId: deliveryId,
      title: payload.title,
      description: payload.body,
    });
  }

  async shipSuccessDelivery(
    customerId: number,
    warehouseId: number,
    deliveryId: number,
    driverId: number,
    packageId: number,
    payload: FCMDto,
  ) {
    await this.deliverisRepository.update({
      state: 5,
      customerId: customerId,
    }, {
      where: {
        [Op.and]: {
          id: deliveryId,
          state: 4,
          customerId: driverId,
          warehouseId: warehouseId,
        }
      }
    });

    await this.packagesRepository.update(
      { state: 5 },
      {
        where: { id: packageId }
      });

    await this.historiesRepository.create({
      deliveryId: deliveryId,
      title: payload.title,
      description: payload.body,
    });
  }

  async findDelivery(state: number) {
    return await this.deliverisRepository.findAll({
      where: {
        state: state,
      },
      include: [
        Location,
        { model: Warehouse, include: [Location, { model: Package, as: 'packages', where: { state: state } }] },
      ],
      raw: true,
      nest: true,
    })
  }

  async findDeliveriesConfirmed(state: number, driverId: number) {
    return await this.deliverisRepository.findAll({
      where: {
        state: state,
        customerId: driverId,
      },
      include: [
        Location,
        {
          model: Warehouse,
          include: [
            Location, { model: Package, as: 'packages', where: { state: state } }
          ],
        },
      ],
      raw: true,
      nest: true
    })
  }
}
