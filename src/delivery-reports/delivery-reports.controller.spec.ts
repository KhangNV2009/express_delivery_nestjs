import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryReportsController } from './delivery-reports.controller';
import { DeliveryReportsService } from './delivery-reports.service';

describe('DeliveryReportsController', () => {
  let controller: DeliveryReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryReportsController],
      providers: [DeliveryReportsService],
    }).compile();

    controller = module.get<DeliveryReportsController>(DeliveryReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
