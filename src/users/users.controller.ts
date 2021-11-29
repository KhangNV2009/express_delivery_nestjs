import { Controller, Post, Body, Put, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPayload } from 'src/jwt/auth.payload';
import { AuthService } from 'src/jwt/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadUserImage } from 'src/config/file.config';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { Auth } from 'src/jwt/auth.decorator';
import { RoleType } from 'src/jwt/roles.guard';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('/register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    return await this.usersService.register(body);
  }

  @Post('/login')
  async login(@Body() body: { email: string, password: string }): Promise<any> {
    const user = await this.usersService.login(body.email, body.password);

    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.roleId,
    };
    const token = await this.authService.signPayload(jwtPayload);
    return { user, token }
  }

  @Put('/me')
  async editProfile(@Body() body: UpdateUserDto): Promise<any> {
    return await this.usersService.updateProfile(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/avatar')
  @UseInterceptors(FileInterceptor('avatar', UploadUserImage))
  async updateAvatar(
    @UploadedFile() avatar: Express.Multer.File[],
    @Req() request: Express.Request,
  ): Promise<any> {
    const user = request.user as JwtPayload;
    const formData: UpdateUserDto = {
      id: user.id,
      avatar: avatar[0].filename,
    } 
    return await this.usersService.updateProfile(formData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/location')
  async updateLocation(@Body() body: UpdateUserLocationDto): Promise<any> {
    return await this.usersService.updateLocation(body);
  }

  // Customer

  @Auth(RoleType.CUSTOMER)
  @Post('/create-packages')
  async createPackages(@Body() packages: CreatePackageDto[]): Promise<any> {
    return await this.usersService.createManyPackages(packages);
  }

  // Driver
  @Post('/driver/register')
  async driverRegister(@Body() body: CreateDriverDto): Promise<any> {
    return await this.usersService.createDriver(body);
  }
}
