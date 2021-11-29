import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryHistoryDto } from './create-delivery-history.dto';

export class UpdateDeliveryHistoryDto extends PartialType(CreateDeliveryHistoryDto) {}
