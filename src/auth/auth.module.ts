import { Module } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    // Indicar estrategia por defecto para passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // registro asincrono de jwt - obtener la configuracion de jwt desde el archivo .env
    JwtModule.registerAsync({
      imports: [ConfigModule], // se importa el modulo para inyectar
      inject: [ConfigService], // se inyecta el servicio como si fuera un constructor
      // inyeccion de dependecias - se usa como un service
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
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
