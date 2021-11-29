import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryOrdersService } from './delivery-orders.service';

describe('DeliveryOrdersService', () => {
  let service: DeliveryOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryOrdersService],
    }).compile();

    service = module.get<DeliveryOrdersService>(DeliveryOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
