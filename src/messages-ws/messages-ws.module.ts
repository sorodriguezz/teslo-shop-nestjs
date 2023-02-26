import { Module } from '@nestjs/common/decorators';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AuthModule]
})
export class MessagesWsModule {}
