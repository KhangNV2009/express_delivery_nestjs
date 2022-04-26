import { Inject, Injectable } from '@nestjs/common';
import { Location } from 'src/locations/entities/location.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
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
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateUserAvatarDto } from './dto/update-user-avatar';

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

  async customerRegister(dto: CustomerRegisterDto): Promise<User> {
    return await this.usersRepository.create(dto);
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

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
      include: [
        Location,
      ],
      raw: true,
      nest: true,
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<any> {
    return await this.usersRepository.update({
      refreshToken: refreshToken
    }, {
      where: { id: userId },
    })
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

  async updateAvatar(info: UpdateUserAvatarDto): Promise<any> {
    const { id, avatar } = info;
    let user = await this.findOne(id);
    user.avatar = avatar;
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
    const location = await this.locationsRepository.create({
      lat: lat,
      lng: lng,
      street: street,
      ward: ward,
      district: district,
      city: city,
    });
    return await this.usersRepository.update({ locationId: location.id }, { where: { id: id } });
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

  async getUserInfo(userId: number) {
    return await this.usersRepository.findOne({
      where: { id: userId, },
      attributes: ['id', 'fullName', 'avatar', 'phoneNumber'],
    })
  }

  // Customer
  async createManyPackages(packages: CreatePackageDto[]): Promise<any> {
    return await this.packagesRepository.bulkCreate(packages);
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
}