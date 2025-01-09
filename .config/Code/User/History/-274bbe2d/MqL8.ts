import { OrganizerRepository } from './application/organizer.repository';
import { Organizer } from './domain/organizer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private organizerRepository: OrganizerRepository
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {

    const organizer = await this.organizerRepository.findByUsername(username);

    const user = { username: 'admin', password: 'admin' };
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
