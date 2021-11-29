import { Inject, Injectable } from '@nestjs/common';
import { Location } from 'src/locations/entities/location.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { Session } from 'src/sessions/entities/session.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { CreateSessionDto } from 'src/sessions/dto/create-session.dto';
import { Op } from 'sequelize';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { Package } from 'src/packages/entities/package.entity';
import { DeliveryHistory } from 'src/delivery-histories/entities/delivery-history.entity';
import { CreateDeliveryHistoryDto } from 'src/delivery-histories/dto/create-delivery-history.dto';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('LOCATIONS_REPOSITORY')
    private locationsRepository: typeof Location,
    @Inject('SESSIONS_REPOSITORY')
    private seesionRepository: typeof Session,
    @Inject('CHATS_REPOSITORY')
    private chatsRepository: typeof Chat,
    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: typeof Package,
    @Inject('DELIVERY_HISTORIES_REPOSITORY')
    private deliveryHistoriesRepository: typeof DeliveryHistory,
    @Inject('VEHICLES_REPOSITORY')
    private vehiclesRepository: typeof Vehicle,
  ) { }

  async register(data: CreateUserDto): Promise<any> {
    data.password = await bcrypt.hash(data.password, 10);
    data.roleId = 1;
    await this.usersRepository.create(data);
  }

  async login(email: string, password: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      include: [
        Location,
        Role,
      ],
      raw: true,
      nest: true,
    });
    if (!user) {
      return undefined;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    delete user.password;
    return isMatch ? user : undefined;
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
      include: [
        Location,
      ],
      raw: true,
      nest: true,
    });
  }

  async updateProfile(info: UpdateUserDto): Promise<any> {
    const { id, fullName, phoneNumber } = info;
    let user = await this.findOne(id);
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    return await this.usersRepository.update(user, {
      where: { id: id },
    })
  }

  async editPassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    let user = await this.findOne(id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      user.password = await bcrypt.hash(newPassword, 10);
      return await this.usersRepository.update({ password: await bcrypt.hash(newPassword, 10) },
        {
          where: { id: id }
        });
    } else {
      return undefined;
    }
  }

  async editAvatar(id: number, avatar: string): Promise<any> {
    return await this.usersRepository.update({ avatar: avatar },
      {
        where: { id: id }
      });
  }

  async updateLocation(data: UpdateUserLocationDto): Promise<any> {
    const { id, lat, lng, street, ward, district, city } = data;
    const location = await this.locationsRepository.findOne({
      where: {
        userId: id,
      },
    })
    if (location != null) {
      return await this.locationsRepository.update({
        lat: lat,
        lng: lng,
        street: street,
        ward: ward,
        district: district,
        city: city,
      }, {
        where: { userId: id }
      });
    } else {
      return await this.locationsRepository.create({
        lat: lat,
        lng: lng,
        street: street,
        ward: ward,
        district: district,
        city: city,
      });
    }
  }

  async createSession(data: CreateSessionDto): Promise<any> {
    const { driverId, customerId } = data;
    return await this.seesionRepository.create({
      driverId: driverId,
      customerId: customerId,
    });
  }

  async getAllChats(data: CreateSessionDto): Promise<any> {
    const { driverId, customerId } = data;
    return await this.chatsRepository.findAll({ where: { [Op.and]: [{ driverId: driverId, }, { customerId: customerId, }] } })
  }

  async createChat(data: CreateChatDto): Promise<any> {
    const { userId, sessionId, text, images } = data;
    return await this.chatsRepository.create({
      userId: userId,
      sessionId: sessionId,
      text: text,
      images: images
    })
  }

  // Customer
  async createManyPackages(packages: CreatePackageDto[]): Promise<any> {
    return await this.packagesRepository.bulkCreate(packages);
  }

  // TODO: book driver
  async bookDriver(): Promise<any> {
  }

  // TODO: tracking delivery
  async trackingDelivery(): Promise<any> {
  }
  // TODO: view history
  async getAllHistories(): Promise<any> {
  }
  // TODO: create history
  async createHistoty(data: CreateDeliveryHistoryDto): Promise<any> {
    return await this.deliveryHistoriesRepository.create(data);
  }

  // TODO: delete history
  async deleteHistoty(id: number): Promise<any> {
    return await this.deliveryHistoriesRepository.destroy({ where: { id: id } });
  }

  // TODO: confirm delivery
  async confirmDelivery(): Promise<any> {
  }
  // Driver
  async createDriver(data: CreateDriverDto): Promise<any> {
    let {
      email,
      password,
      fullName,
      phoneNumber,
      avatar,
      roleId,
      modelCode,
      licensePlate,
      brandName,
    } = data;

    password = await bcrypt.hash(password, 10);

    const driver = await this.usersRepository.create({
      email,
      password,
      fullName,
      phoneNumber,
      avatar,
      roleId,
    });

    return await this.vehiclesRepository.create({
      modelCode,
      licensePlate,
      brandName,
      driverId: driver.id,
    });
  }

  // TODO: onduty
  async onDuty(): Promise<any> {
  }

  // TODO: accept delivery
  async acceptPackages(): Promise<any> {
  }

  // TODO: done delivery
  async doneDelivery(): Promise<any> {
  }
}