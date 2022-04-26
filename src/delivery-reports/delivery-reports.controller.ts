import { Controller, Get, Post, Body } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.guard';
import { GetCurrentUserId, } from 'src/common/decorators';
import { FirebaseMessaginService } from 'src/firebase-messaging/firebase-messaging.service';
import { DeliveryReportsService } from './delivery-reports.service';
import { CreateDeliveryReportDto } from './dto/create-delivery-report.dto';

@Controller('delivery-reports')
export class DeliveryReportsController {
  constructor(
    private readonly deliveryReportsService: DeliveryReportsService,
    private readonly fcmService: FirebaseMessaginService,
  ) { }

  @Auth(RoleType.CUSTOMER)
  @Get()
  getReports(@GetCurrentUserId() id: number) {
    return this.deliveryReportsService.findReports(id);
  }

  @Auth(RoleType.DRIVER)
  @Post()
  createReport(@Body() dto: CreateDeliveryReportDto) {
    this.fcmService.pushReport(dto.customerId, dto.title, dto.description);
    return this.deliveryReportsService.createReports(dto);
  }
}
