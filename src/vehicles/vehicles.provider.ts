import { Vehicle } from "./entities/vehicle.entity";

export const vehiclesProviders = [
    {
        provide: 'VEHICLES_REPOSITORY',
        useValue: Vehicle,
    }
]