import { DeliveryOrder } from "./entities/delivery-order.entity";

export const deliveryOrdersProviders = [
    {
        provide: 'DELIVERY_ORDERS_REPOSITORY',
        useValue: DeliveryOrder,
    }
]