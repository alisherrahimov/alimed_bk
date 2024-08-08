import { UsePipes } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ValidationPipe } from 'src/helper/pipes/validationPipe';
import { SendMessagesBody, sendMessagesSchema } from './schema/chat.schema';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @UsePipes(new ValidationPipe(sendMessagesSchema))
  @SubscribeMessage('send_message')
  async sendMessage(@MessageBody() data: SendMessagesBody): Promise<void> {
    this.chatService.sendMessage(data);
  }

  handleConnection(socket: Socket) {
    this.chatService.handleConnection(socket);
  }
}
