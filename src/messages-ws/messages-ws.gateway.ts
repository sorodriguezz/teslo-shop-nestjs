import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true, namespace: '/' }) // configuracion cors para socket
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  // para ver quien se conectó y desconectó

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token); // verificar token del payload
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect(); // botar conexion del cliente
      return;
    }

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: any) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client') // escucha evento del cliente
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! emite unicamente al cliente
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'no-message',
    // });

    //! emite a todos menos al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //     fullName: 'Soy yo',
    //     message: payload.message || 'no-message',
    //   });

    //! emite a una persona sala
    // this.wss.to('clientId')

    //! une a una sala
    // client.join('ventas')

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullNameBySocketId(client.id),
      message: payload.message || 'no-message',
    });
  }
}
