import { DeliveryReports } from "./entities/delivery-report.entity";


export const deliveryReportsProviders = [
    {
        provide: 'DELIVERY_REPORTS_REPOSITORY',
        useValue: DeliveryReports,
    }
]