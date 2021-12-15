import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    id: number;
    
    fullName: string;

    phoneNumber: string;
}
