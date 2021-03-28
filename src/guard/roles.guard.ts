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
    // if (!roles) {
    //   throw new HttpException('this is error message', HttpStatus.FORBIDDEN);
    // }
    console.log(roles);
    const request = context.switchToHttp().getRequest();
    const user = request.query.user;
    if (user === 'admin') {
      return true;
    } else {
      throw new HttpException(
        `Roles error message. user: ${user}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
