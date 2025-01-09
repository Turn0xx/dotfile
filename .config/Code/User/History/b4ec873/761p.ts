import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { IdentityModule } from '../../identity/identity.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from '../../identity/application/local.strategy';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    IdentityModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: 'secret', //TODO: move to env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    LocalStrategy,
    GoogleStrategy,
  ],
  exports: [AuthController],
})
export class AuthModule {}
