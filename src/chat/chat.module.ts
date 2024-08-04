import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatController],
})
export class ChatModule {}
