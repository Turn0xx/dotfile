import { Email } from '../../identity/domain/value-objetcs/email';
import { brotliCompressSync } from 'zlib';
import { PROVIDERS } from '../../providers-strings';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from '../../identity/application/client.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PROVIDERS.CLIENT_REPOSITORY) private clientRepository: ClientRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {

    const organizer = (await this.clientRepository.findByEmail(username)).toJson();

    const hashedPassword = organizer.password;

    const isPasswordMatching = await bcrypt.compare(pass, hashedPassword);

    if (!isPasswordMatching) {
      return null;
    }
 
    const user = {
      email: organizer.email,
      sub: organizer.id,
    };

    return {
      ...user,
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
