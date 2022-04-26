import { Inject, Injectable } from '@nestjs/common';
import { DeliveryOrder } from 'src/delivery-orders/entities/delivery-order.entity';
import { CreateDeliveryReportDto } from './dto/create-delivery-report.dto';
import { DeliveryReports } from './entities/delivery-report.entity';

@Injectable()
export class DeliveryReportsService {
    constructor(
        @Inject('DELIVERY_REPORTS_REPOSITORY')
        private reportsRepository: typeof DeliveryReports,
    ) { }

    async createReports(dto: CreateDeliveryReportDto) {
        const { deliveryId, title, description } = dto;
        return await this.reportsRepository.create({
            deliveryId,
            title,
            description,
        });
    }

    async findReports(customerId: number) {
        const data = await this.reportsRepository.findAll({
            include: [
                { model: DeliveryOrder, where: { customerId: customerId } }
            ]
        });
        return data;
    }
}
