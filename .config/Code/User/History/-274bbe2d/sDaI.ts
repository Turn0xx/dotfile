import { Email } from './domain/value-objetcs/email';
import { brotliCompressSync } from 'zlib';
import { PROVIDERS } from '../providers-strings';
import { OrganizerRepository } from './application/organizer.repository';
import { Organizer } from './domain/organizer';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PROVIDERS.ORGANIZER_REPOSITORY) private organizerRepository: OrganizerRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {

    const organizer = (await this.organizerRepository.findByUsername(username)).toJson();

    const hashedPassword = organizer.password;

    const isPasswordMatching = await bcrypt.compare(pass, hashedPassword);

    if (!isPasswordMatching) {
      return null;
    }

    const user = {
      username: organizer.username,
      email: organizer.email,
      sub: organizer.id,
    };

    return {
      
    }
  }
}
