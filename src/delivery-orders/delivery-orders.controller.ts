import { Controller, Get, Post, Body, Put, Query } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.guard';
import { GetCurrentUserId } from 'src/common/decorators';
import { FirebaseMessaginService } from 'src/firebase-messaging/firebase-messaging.service';
import { PackagesService } from 'src/packages/packages.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { DeliveryOrdersService } from './delivery-orders.service';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';

@Controller('delivery-orders')
export class DeliveryOrdersController {
  constructor(
    private readonly deliveryOrdersService: DeliveryOrdersService,
    private readonly packagesService: PackagesService,
    private readonly fcmService: FirebaseMessaginService,
    private readonly sessionsServices: SessionsService,
  ) { }

  @Auth(RoleType.CUSTOMER)
  @Post()
  create(
    @GetCurrentUserId() customerId: number, 
    @Body() dto: CreateDeliveryOrderDto,
  ) {
    dto.customerId = customerId;
    const payload = this.fcmService.getFCMHistoryType(2);
    this.fcmService.pushHistory(customerId, payload);
    return this.deliveryOrdersService.createDelivery(dto, payload);
  }

  @Auth(RoleType.DRIVER)
  @Put('confirmed')
  confirmedDelivery(
    @GetCurrentUserId() driverId: number,
    @Body() body: { warehouseId: number, customerId: number, packageId: number, deliveryId: number }
  ) {
    const payload = this.fcmService.getFCMHistoryType(3);
    this.packagesService.updateStatePackge(3, body.packageId);
    this.deliveryOrdersService.confirmDelivery(body.customerId, body.warehouseId, body.deliveryId, driverId, body.packageId, payload);
    this.sessionsServices.createSession(body.customerId, driverId, body.deliveryId);
    return this.fcmService.pushHistory(body.customerId, payload);
  }

  @Auth(RoleType.DRIVER)
  @Put('in-transit')
  inTransitDelivery(
    @GetCurrentUserId() driverId: number,
    @Body() body: { warehouseId: number, customerId: number, packageId: number, deliveryId: number }
  ) {
    const payload = this.fcmService.getFCMHistoryType(4);
    this.packagesService.updateStatePackge(4, body.packageId);
    this.deliveryOrdersService.inTransitDelivery(body.warehouseId, body.deliveryId, driverId, body.packageId, payload);
    return this.fcmService.pushHistory(body.customerId, payload);
  }

  @Auth(RoleType.DRIVER)
  @Put('ship-success')
  async shipSuccessDelivery(
    @GetCurrentUserId() driverId: number,
    @Body() body: { warehouseId: number, customerId: number, packageId: number, deliveryId: number }
  ) {
    const payload = this.fcmService.getFCMHistoryType(5);
    await this.packagesService.updateStatePackge(5, body.packageId);
    await this.deliveryOrdersService.shipSuccessDelivery(body.customerId, body.warehouseId, body.deliveryId, driverId, body.packageId, payload);
    await this.sessionsServices.deleteSession(body.deliveryId);
    return this.fcmService.pushHistory(body.customerId, payload);
  }

  @Auth(RoleType.DRIVER)
  @Get()
  getDeliveries(@Query('state') state: number) {
    return this.deliveryOrdersService.findDelivery(state);
  }

  @Auth(RoleType.DRIVER)
  @Get('confirmed')
  getDeliveriesConfirmed(
    @Query('state') state: number,
    @GetCurrentUserId() driverId: number,
  ) {
    return this.deliveryOrdersService.findDeliveriesConfirmed(state, driverId);
  }
}
