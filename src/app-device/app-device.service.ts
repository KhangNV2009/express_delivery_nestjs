import { Inject, Injectable } from '@nestjs/common';
import { AppDevice } from './entities/app-device.entity';

@Injectable()
export class AppDeviceService {
  constructor(
    @Inject('APP_DEVICE_REPOSITORY')
    private appDeviceRepository: typeof AppDevice,
  ) { }

  async createAppDevice(platform: string, token: string, userId: number) {
    const appDevice = await this.appDeviceRepository.findOne({
      where: {
        token: token,
      },
      raw: true,
      nest: true,
    });
    if(!appDevice) {
      await this.appDeviceRepository.create({
        userId: userId,
        platform: platform,
        token: token,
      });
      return 'Create app device successfully';
    }
    return 'App device already exits';
  }
}
