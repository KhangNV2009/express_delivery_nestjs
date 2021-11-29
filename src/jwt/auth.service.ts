import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload: JwtPayload) {
    return sign(payload, 'secretKey', { expiresIn: '12h' });
  }

  async validateUser(payload: JwtPayload) {
    const id = payload.id;
    return await this.usersService.findOne(id);
  }
}