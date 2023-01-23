import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategyL: 'jwt' }),
    JwtModule.registerAsync({
      // registro asincrono de jwt
      imports: [ConfigModule], // se importa el modulo
      inject: [ConfigService], // inyeccion del servicio
      // inyeccion de dependecias - se usa como un controller
      useFactory: (configService: ConfigService) => {
        return {
          // se puede ocupar variable de entorno igual
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
