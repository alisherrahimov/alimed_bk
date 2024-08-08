import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import {
  userSchema,
  UserSchemaBody,
  verifyOtp,
  VerifyOtpBody,
} from './schema/user.schema';
import { ValidationPipe } from 'src/helper/pipes/validationPipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe(userSchema))
  async login(@Body() data: UserSchemaBody) {
    return await this.userService.login(data);
  }

  @Post('verify-otp')
  @UsePipes(new ValidationPipe(verifyOtp))
  async verifyOTP(@Body() data: VerifyOtpBody) {
    return await this.userService.verifyOTP(data);
  }

  @Post('resend-otp')
  @UsePipes(new ValidationPipe(verifyOtp))
  async resendOTP(@Body() data: VerifyOtpBody) {
    return await this.userService.resendOTP(data);
  }
}
