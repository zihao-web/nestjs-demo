import {
  Injectable,
  HttpStatus,
  CanActivate,
  HttpException,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || !roles.length) return true;
    const { headers } = context.switchToHttp().getRequest();
    const headerRoles: string[] = headers.roles ? headers.roles.split(',') : [];
    if (roles.some((role) => headerRoles.includes(role))) {
      return true;
    } else {
      throw new HttpException('很抱歉，您没有权限。', HttpStatus.FORBIDDEN);
    }
  }
}
