import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { CustomerRegisterDto } from 'src/users/dto/customer-register.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UsersService,
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) { }

  async register(dto: CustomerRegisterDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.usersRepository.create({
      email: dto.email,
      fullName: dto.fullName,
      phoneNumber: dto.phoneNumber,
      password: hash,
      roleId: dto.roleId,
    });

    const tokens = await this.getTokens(user.id, user.email, user.roleId);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async login(email: string, password: string): Promise<Tokens> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.roleId);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.usersRepository.update({ hashedRt: null }, { where: { id: userId, }, });
    return true;
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.roleId);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.usersRepository.update({ hashedRt: hash }, { where: { id: userId, }, });
  }

  async getTokens(userId: number, email: string, roleId: number): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      email: email,
      role: roleId,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async me(userId: number) {
    return this.userService.findOne(userId);
  }

  async getUserInfo(userId: number) {
    return this.usersRepository.findOne({
      where: {id: userId},
      attributes: ['id', 'fullName', 'email', 'phoneNumber', 'avatar'],
    });
  }
}