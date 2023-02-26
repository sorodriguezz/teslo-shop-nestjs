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

@WebSocketGateway({ cors: true, namespace: '/' }) // configuracion cors para socket
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  // para ver quien se conectó y desconectó

  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);
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
      fullName: 'Soy yo',
      message: payload.message || 'no-message',
    });
  }
}
