import { OrganizerRepository } from 'src/pocket-ticket/client/application/organizer.repository';
import { Organizer, OrganizerJson } from 'src/pocket-ticket/client/domain/organizer';
import { DateProvider } from '../domain/date-provider';
import { DuplicateFieldError } from '../errors/duplicateField.error';

export class InMemoryOrganizerRepository implements OrganizerRepository {
  private organizers: OrganizerJson[] = [];

  constructor() {}

  async save(organizer: Organizer) {
    const savedOrganizer = await this.organizers.find(
      (o) => o.id === organizer.getId(),
    );

    if (savedOrganizer) {
      
      this.organizers.;

    }

    const duplicateEmail = await this.organizers.filter(
      (o) => o.email === organizer.getEmail(),
    );

    if (duplicateEmail.length > 0) {
      throw new DuplicateFieldError('email');
    }

    const duplicatePhoneNumber = await this.organizers.filter(
      (o) => o.phoneNumber === organizer.getPhoneNumber(),
    );

    if (duplicatePhoneNumber.length > 0) {
      throw new DuplicateFieldError('phoneNumber');
    }

    this.organizers.push(organizer);
  }

  async findByEmail(email: string): Promise<Organizer | undefined> {
    return this.organizers.find((organizer) => organizer.email === email);
  }
}

export class StubDateProvider implements DateProvider {
  constructor() {}
  now: Date;
  getNow(): Date {
    return this.now;
  }
}
