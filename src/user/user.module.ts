import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [UserService, PrismaService, JwtService],
  imports: [CacheModule.register()],
})
export class UserModule {}
