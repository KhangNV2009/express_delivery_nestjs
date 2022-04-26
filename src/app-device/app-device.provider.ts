import { AppDevice } from "./entities/app-device.entity";


export const appDeviceProviders = [
    {
        provide: 'APP_DEVICE_REPOSITORY',
        useValue: AppDevice,
    }
]