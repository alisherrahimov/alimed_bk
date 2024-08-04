import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [ChatModule, UserModule, PrismaModule, DoctorModule],
  controllers: [AppController, UserController, DoctorController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
