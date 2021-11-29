import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryHistoriesService } from './delivery-histories.service';

describe('DeliveryHistoriesService', () => {
  let service: DeliveryHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryHistoriesService],
    }).compile();

    service = module.get<DeliveryHistoriesService>(DeliveryHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
