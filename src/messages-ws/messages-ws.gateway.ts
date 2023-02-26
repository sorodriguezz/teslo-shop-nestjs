import { WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true }) // configuracion cors para socket
export class MessagesWsGateway {
  constructor(private readonly messagesWsService: MessagesWsService) {}

  
}
