import { Controller, Post, Body, Put, UseGuards, UseInterceptors, UploadedFile, Req, Get, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPayload } from 'src/jwt/auth.payload';
import { AuthService } from 'src/jwt/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { Auth } from 'src/jwt/auth.decorator';
import { RoleType } from 'src/jwt/roles.guard';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateUserPassword } from './dto/update-user-password';
import { Express } from 'express';
import { UpdateUserAvatarDto } from './dto/update-user-avatar';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { diskStorage } from 'multer';
import { editFileName, UploadUserImage } from 'src/config/file.config';

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

  @Auth(RoleType.CUSTOMER)
  @Put('/me')
  async editProfile(
    @Body() body: UpdateUserDto,
    @Req() request: Express.Request,
  ): Promise<any> {
    const user = request.user as JwtPayload;
    body.id = user.id
    await this.usersService.updateProfile(body);
    return "Update successfully";
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/password')
  async editPassword(
    @Body() body: UpdateUserPassword,
    @Req() request: Express.Request,
  ): Promise<any> {
    const user = request.user as JwtPayload;
    await this.usersService.editPassword(
      user.id,
      body.oldPassword,
      body.newPassword,
    );
    return "Update successfully";
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
  }))
  async updateAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() request: Express.Request,
  ): Promise<any> {
    const user = request.user as JwtPayload;
    const formData: UpdateUserAvatarDto = {
      id: user.id,
      avatar: avatar.filename,
    }
    await this.usersService.updateAvatar(formData);
    return avatar.filename;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/location')
  async updateLocation(@Body() body: UpdateUserLocationDto): Promise<any> {
    await this.usersService.updateLocation(body);
    return "Update successfully";
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


  @Get('image/:filename')
  async downloadImage(
    @Param('filename') fileName,
    @Res() res,
  ): Promise<any> {
    const response = res.sendFile(
      join(process.cwd(), `./upload/${fileName}`),
    );
    console.log(fileName);
    return of(response);
  }
}
