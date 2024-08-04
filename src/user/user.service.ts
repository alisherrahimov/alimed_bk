import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaClient: PrismaService) {}

  async login() {
    return 'login';
  }
}
