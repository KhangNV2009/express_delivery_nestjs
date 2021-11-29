import { Location } from "./entities/location.entity";

export const locationsProviders = [
    {
        provide: 'LOCATIONS_REPOSITORY',
        useValue: Location,
    }
]