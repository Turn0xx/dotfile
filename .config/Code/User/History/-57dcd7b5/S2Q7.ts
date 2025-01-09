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
    const payload = {
      clientId: configService.get('GOOGLE_OAUTH2_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH2_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_OAUTH2_REDIRECT_URI'),
      passReqToCallback: true,
      scope: ['email', 'profile'],
    };

    super(payload);
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const { emails, id, displayName } = profile;
    const email = emails[0].value;


    

  }
}
