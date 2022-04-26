import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryReportsService } from './delivery-reports.service';

describe('DeliveryReportsService', () => {
  let service: DeliveryReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryReportsService],
    }).compile();

    service = module.get<DeliveryReportsService>(DeliveryReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
