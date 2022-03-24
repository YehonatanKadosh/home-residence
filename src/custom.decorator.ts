import { SetMetadata } from '@nestjs/common';
import { Roles as userRoles } from 'src/users/schemas/user.schema';

export const IS_PUBLIC_KEY = 'noJWTRequired';
export const SkipJWTAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: userRoles[]) => SetMetadata('roles', roles);
