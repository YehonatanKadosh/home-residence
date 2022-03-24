import { SetMetadata } from '@nestjs/common';
import { Roles as userRoles } from 'src/users/schemas/user.schema';

export const Roles = (...roles: userRoles[]) => SetMetadata('roles', roles);
