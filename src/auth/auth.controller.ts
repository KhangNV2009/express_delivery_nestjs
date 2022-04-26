import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { join } from 'path';
import { of } from 'rxjs';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { editFileName } from 'src/config/file.config';
import { CustomerRegisterDto } from 'src/users/dto/customer-register.dto';
import { UpdateUserAvatarDto } from 'src/users/dto/update-user-avatar';
import { UpdateUserLocationDto } from 'src/users/dto/update-user-location.dto';
import { UpdateUserPassword } from 'src/users/dto/update-user-password';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';
import { RoleType } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Post('login')
    login(@Body() body: { email: string, password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    refreshToken(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ) {
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
        return this.authService.logout(userId);
    }

    @Post('driver/register')
    driverRegister(@Body() dto: CustomerRegisterDto) {
        dto.roleId = 2;
        return this.authService.register(dto);
    }

    @Post('customer/register')
    customerRegister(@Body() dto: CustomerRegisterDto) {
        dto.roleId = 1;
        return this.authService.register(dto);
    }

    @UseGuards(AccessTokenGuard)
    @Get('me')
    me(@GetCurrentUserId() userId: number) {
        return this.authService.me(userId);
    }

    @Auth(RoleType.CUSTOMER)
    @Put('/me')
    async editProfile(
        @GetCurrentUserId() userId: number,
        @Body() body: UpdateUserDto,
    ): Promise<any> {
        body.id = userId
        await this.usersService.updateProfile(body);
        return "Update successfully";
    }

    @Get('user/:userId')
    getUserInfo(@Param('userId') userId: number) {
        return this.authService.getUserInfo(userId);
    }

    @UseGuards(AccessTokenGuard)
    @Put('/me/password')
    async editPassword(
        @GetCurrentUserId() userId: number,
        @Body() body: UpdateUserPassword,
    ): Promise<any> {
        await this.usersService.editPassword(
            userId,
            body.oldPassword,
            body.newPassword,
        );
        return "Update successfully";
    }

    @UseGuards(AccessTokenGuard)
    @Put('/me/avatar')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './upload',
            filename: editFileName,
        }),
    }))
    async updateAvatar(
        @GetCurrentUserId() userId: number,
        @UploadedFile() avatar: Express.Multer.File,
    ): Promise<any> {
        const formData: UpdateUserAvatarDto = {
            id: userId,
            avatar: avatar.filename,
        }
        await this.usersService.updateAvatar(formData);
        return avatar.filename;
    }

    @UseGuards(AccessTokenGuard)
    @Put('/me/location')
    async updateLocation(
        @GetCurrentUserId() userId: number,
        @Body() body: UpdateUserLocationDto,
    ): Promise<any> {
        body.id = userId;
        await this.usersService.updateLocation(body);
        return "Update successfully";
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
