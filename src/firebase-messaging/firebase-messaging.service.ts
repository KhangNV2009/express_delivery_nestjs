import { Injectable, Inject } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import { AppDevice } from 'src/app-device/entities/app-device.entity';
import { FCMDto } from './dto/fcmDto.dto';

@Injectable()
export class FirebaseMessaginService {
  constructor(
    @Inject('APP_DEVICE_REPOSITORY')
    private appDeviceRepository: typeof AppDevice,
  ) { }

  async pushHistory(userId: number, dto: FCMDto): Promise<any> {
    const appDevices = await this.appDeviceRepository.findAll({
      where: { userId: userId }
    });

    const tokens = appDevices.map(appDevice => appDevice.token);

    const payload: MessagingPayload = {
      data: {
        'type': 'history',
      },
      notification: {
        body: dto.body,
        title: dto.title,
      },
    }

    firebase.messaging().sendToDevice(tokens, payload)
  }

  async pushReport(customerId: number, title: string, body: string): Promise<any> {
    const appDevices = await this.appDeviceRepository.findAll({
      where: { userId: customerId }
    });

    const tokens = appDevices.map(appDevice => appDevice.token);

    const payload: MessagingPayload = {
      data: {
        'type': 'report',
      },
      notification: {
        body: body,
        title: title,
      },
    }

    firebase.messaging().sendToDevice(tokens, payload)
  }

  getFCMHistoryType(state: number): FCMDto {
    switch (state) {
      case 2:
        return {
          title: 'Create a successful delivery order',
          body: 'Your order has been successfully created, waiting for a driver to take your order.',
        };
      case 3:
        return {
          title: 'Delivery order approved',
          body: `Your delivery order has been received by driver, the driver is coming to the location to receive the goods.`
        };
      case 4:
        return { 
          title: 'Orders are shipping', 
          body: 'The driver is delivering your goods to your warehouse.' 
        };
      case 5:
        return { 
          title: 'Successful shipping', 
          body: 'Your order has been delivered successfully.' 
        };
    }
  }
}