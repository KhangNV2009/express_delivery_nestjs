import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryOrdersController } from './delivery-orders.controller';
import { DeliveryOrdersService } from './delivery-orders.service';

describe('DeliveryOrdersController', () => {
  let controller: DeliveryOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryOrdersController],
      providers: [DeliveryOrdersService],
    }).compile();

    controller = module.get<DeliveryOrdersController>(DeliveryOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
