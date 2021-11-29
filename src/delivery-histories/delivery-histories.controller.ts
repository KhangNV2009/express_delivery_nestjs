import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryHistoriesService } from './delivery-histories.service';
import { CreateDeliveryHistoryDto } from './dto/create-delivery-history.dto';
import { UpdateDeliveryHistoryDto } from './dto/update-delivery-history.dto';

@Controller('delivery-histories')
export class DeliveryHistoriesController {
  constructor(private readonly deliveryHistoriesService: DeliveryHistoriesService) {}

  @Post()
  create(@Body() createDeliveryHistoryDto: CreateDeliveryHistoryDto) {
    return this.deliveryHistoriesService.create(createDeliveryHistoryDto);
  }

  @Get()
  findAll() {
    return this.deliveryHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryHistoryDto: UpdateDeliveryHistoryDto) {
    return this.deliveryHistoriesService.update(+id, updateDeliveryHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryHistoriesService.remove(+id);
  }
}
