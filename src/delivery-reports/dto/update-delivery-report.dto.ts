import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryReportDto } from './create-delivery-report.dto';

export class UpdateDeliveryReportDto extends PartialType(CreateDeliveryReportDto) {}
