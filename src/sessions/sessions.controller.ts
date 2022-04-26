import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.guard';
import { GetCurrentUserId } from 'src/common/decorators';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {
  }

  @Auth(RoleType.CUSTOMER)
  @Get('/customer')
  getCustomerSession(@GetCurrentUserId() customerId: number) {
    return this.sessionsService.getCustomerSession(customerId);
  }

  @Auth(RoleType.DRIVER)
  @Get('/driver')
  getDriverSession(@GetCurrentUserId() driverId: number) {
    return this.sessionsService.getDriverSession(driverId);
  }
}
