import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { AppDeviceService } from './app-device.service';
import { CreateAppDeviceDto } from './dto/create-app-device.dto';
import { UpdateAppDeviceDto } from './dto/update-app-device.dto';

@Controller('app-device')
export class AppDeviceController {
  constructor(private readonly appDeviceService: AppDeviceService) { }

  @UseGuards(AccessTokenGuard)
  @Post()
  createAppDevice(
    @GetCurrentUserId() userId: number,
    @Body() body: { platform: string, token: string },
  ) {
    return this.appDeviceService.createAppDevice(body.platform, body.token, userId);
  }
}
