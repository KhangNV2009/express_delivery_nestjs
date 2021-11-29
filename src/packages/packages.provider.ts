import { Package } from "./entities/package.entity";

export const packagesProviders = [
    {
        provide: 'PACKAGES_REPOSITORY',
        useValue: Package,
    }
]