import { Test, TestingModule } from '@nestjs/testing';
import { AppDeviceService } from './app-device.service';

describe('AppDeviceService', () => {
  let service: AppDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppDeviceService],
    }).compile();

    service = module.get<AppDeviceService>(AppDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
