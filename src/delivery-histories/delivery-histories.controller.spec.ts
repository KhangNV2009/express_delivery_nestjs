import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryHistoriesController } from './delivery-histories.controller';
import { DeliveryHistoriesService } from './delivery-histories.service';

describe('DeliveryHistoriesController', () => {
  let controller: DeliveryHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryHistoriesController],
      providers: [DeliveryHistoriesService],
    }).compile();

    controller = module.get<DeliveryHistoriesController>(DeliveryHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
