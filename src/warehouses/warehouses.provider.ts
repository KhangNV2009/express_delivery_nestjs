import { Warehouse } from "./entities/warehouse.entity";

export const warehousesProviders = [
    {
        provide: 'WAREHOUSES_REPOSITORY',
        useValue: Warehouse,
    }
]