import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/' }) // configuracion cors para socket
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect { // para ver quien se conectó y desconectó

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    // console.log('cliente conectado: ', client.id);
    this.messagesWsService.registerClient(client);
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
  }

  handleDisconnect(client: any) {
    // console.log('cliente desconectado: ', client.id);
    this.messagesWsService.removeClient(client.id);
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
  }

}
