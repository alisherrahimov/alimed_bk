// jwt guard

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      const user = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
