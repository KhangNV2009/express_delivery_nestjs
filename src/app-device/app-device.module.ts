import { Module } from '@nestjs/common';
import { AppDeviceService } from './app-device.service';
import { AppDeviceController } from './app-device.controller';
import { appDeviceProviders } from './app-device.provider';

@Module({
  controllers: [AppDeviceController],
  providers: [AppDeviceService, ...appDeviceProviders]
})
export class AppDeviceModule {}
