import { brotliCompressSync } from 'zlib';
import { PROVIDERS } from '../providers-strings';
import { OrganizerRepository } from './application/organizer.repository';
import { Organizer } from './domain/organizer';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PROVIDERS.ORGANIZER_REPOSITORY) private organizerRepository: OrganizerRepository
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {

    const organizer = await this.organizerRepository.findByUsername(username);

    const hashedPassword = organizer?.password;

    if (hashedPassword) {
      const isMatch = await bcrypt.compare(pass, hashedPassword);
      if (isMatch) {
        return organizer;
      }
    }


  }
}
