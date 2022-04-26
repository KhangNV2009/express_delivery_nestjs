import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.guard';
import { GetCurrentUserId } from 'src/common/decorators';
import { DeliveryHistoriesService } from './delivery-histories.service';

@Controller('delivery-histories')
export class DeliveryHistoriesController {
  constructor(private readonly deliveryHistoriesService: DeliveryHistoriesService) {
  }

  @Auth(RoleType.CUSTOMER)
  @Get()
  getHistories(@GetCurrentUserId() customerId: number) {
    return this.deliveryHistoriesService.findHistories(customerId);
  }
}
