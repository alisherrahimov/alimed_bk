import { UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ValidationPipe } from 'src/helper/pipes/validationPipe';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetMessagesBody,
  SendMessagesBody,
  sendMessagesSchema,
} from './schema/chat.schema';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prismaClient: PrismaService) {}

  @UsePipes(new ValidationPipe(sendMessagesSchema))
  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: SendMessagesBody,
  ): Promise<WsResponse<any>> {
    try {
      const message = await this.prismaClient.message.create({
        data: {
          content: data.content,
          senderId: data.senderId,
          senderType: data.senderType,
          receiverId: data.receiverId,
          receiverType: data.receiverType,
        },
      });
      return { event: 'send-message', data: message };
    } catch (error) {
      console.error(error);
      throw new Error('Error while sending message');
    }
  }

  @SubscribeMessage('get-messages')
  async getMessages(
    @MessageBody() data: GetMessagesBody,
  ): Promise<WsResponse<any>> {
    try {
      const messages = await this.prismaClient.message.findMany({
        where: {
          OR: [
            {
              senderId: data.user_id,
              receiverId: data.doctor_id,
            },
            {
              senderId: data.doctor_id,
              receiverId: data.user_id,
            },
          ],
        },
      });
      return { event: 'get-messages', data: messages };
    } catch (error) {
      console.error(error);

      throw new Error('Error while fetching messages');
    }
  }
}
