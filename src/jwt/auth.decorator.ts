import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/app.constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleType, RolesGuard } from '../auth/roles.guard';

export function Auth(...roles: RoleType[]) {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(JwtAuthGuard, RolesGuard),
    );
}