import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessagesBody } from './schema/chat.schema';

type ConnectedClients = {
  user_id: string;
  doctor_id: string;
};

export class ChatService {
  private readonly connectedClients = new Map<string, ConnectedClients>();
  constructor(private prismaClient: PrismaService) {}

  async handleConnection(socket: Socket) {
    socket.on('disconnect', () => {
      this.connectedClients.delete(socket.id);
    });
  }

  async sendMessage(data: SendMessagesBody) {}
}
