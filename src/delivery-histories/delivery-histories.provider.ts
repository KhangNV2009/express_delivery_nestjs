import { DeliveryHistory } from "./entities/delivery-history.entity";

export const deliveryHistoriesProviders = [
    {
        provide: 'DELIVERY_HISTORIES_REPOSITORY',
        useValue: DeliveryHistory,
    }
]