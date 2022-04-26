import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }
}
