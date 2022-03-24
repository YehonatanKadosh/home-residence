import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles, User } from 'src/users/schemas/user.schema';

@Injectable()
export class RolesGuard extends AuthGuard('admin') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.get<Roles[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user: Partial<User> = request.user;

    if (!requiredRoles.includes(user.role)) throw new UnauthorizedException();
    return true;
  }
}
