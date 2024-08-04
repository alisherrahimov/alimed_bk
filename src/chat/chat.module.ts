import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.geteway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatGateway, PrismaService],
})
export class ChatModule {}
