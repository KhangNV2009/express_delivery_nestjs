import { Test, TestingModule } from '@nestjs/testing';
import { AppDeviceController } from './app-device.controller';
import { AppDeviceService } from './app-device.service';

describe('AppDeviceController', () => {
  let controller: AppDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppDeviceController],
      providers: [AppDeviceService],
    }).compile();

    controller = module.get<AppDeviceController>(AppDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
