import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSchemaBody, VerifyOtpBody } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { MyResponse } from 'src/helper/response/MyResponse';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private prismaClient: PrismaService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(data: UserSchemaBody) {
    try {
      const userExist = await this.prismaClient.user.findUnique({
        where: {
          phone: data.phone,
        },
      });

      const otp = await this.generateOTP(data.phone);

      if (userExist) {
        return MyResponse.success({ user: userExist, otp });
      }

      const user = await this.prismaClient.user.create({
        data: {
          phone: data.phone,
        },
      });

      return MyResponse.success({ user, otp });
    } catch (error) {
      return error;
    }
  }

  async verifyOTP(data: VerifyOtpBody) {
    try {
      const otp = await this.cacheManager.get(data.phone);
      if (Number(otp) === data.otp) {
        const user = await this.prismaClient.user.findUnique({
          where: {
            phone: data.phone,
          },
        });

        if (user) {
          const token = await this.generateToken(user);
          return MyResponse.success({ token });
        }
      }
      return MyResponse.error('Invalid OTP', 400);
    } catch (error) {
      return error;
    }
  }

  async resendOTP(data: VerifyOtpBody) {
    try {
      const otp = await this.generateOTP(data.phone);
      return MyResponse.success({ otp });
    } catch (error) {
      return error;
    }
  }

  async generateToken(user: User) {
    try {
      const payload = { id: user.id };
      return this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      return error;
    }
  }

  async generateOTP(data: string) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      this.cacheManager.set(data, otp, 1000);
      return otp;
    } catch (error) {
      return error;
    }
  }
}
