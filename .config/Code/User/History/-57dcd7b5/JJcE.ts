import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_OAUTH2_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH2_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_OAUTH2_REDIRECT_URI'),
      scope: ['email', 'profile'],
    });

    const payload = {
      clientID: configService.get('GOOGLE_OAUTH2_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH2_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_OAUTH2_REDIRECT_URI'),
      scope: ['email', 'profile'],
    };

    console.log(payload);
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    console.log(profile);
  }
}
