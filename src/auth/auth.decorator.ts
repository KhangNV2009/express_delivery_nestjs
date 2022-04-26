import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/app.constants';
import { RoleType, RolesGuard } from '../auth/roles.guard';
import { AccessTokenGuard } from 'src/common/guards';

export function Auth(...roles: RoleType[]) {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(AccessTokenGuard, RolesGuard),
    );
}