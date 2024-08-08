import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.geteway';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, PrismaService, ChatService],
})
export class ChatModule {}
