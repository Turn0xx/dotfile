import { OrganizerRepository } from 'src/pocket-ticket/client/application/organizer.repository';
import { OrganizerJson } from 'src/pocket-ticket/client/domain/organizer';
import { DateProvider } from '../domain/date-provider';
import { DuplicateFieldError } from '../errors/duplicateField.error';

export class InMemoryOrganizerRepository implements OrganizerRepository {
  private organizers: OrganizerJson[] = [];

  constructor() {}

  async save(organizer: OrganizerJson) {
    const duplicateEmail = await this.organizers.filter(
      (o) => o.email === organizer.email,
    );

    if (duplicateEmail.length > 0) {
      throw new DuplicateFieldError('email');
    }

    const duplicatePhoneNumber = await this.organizers.filter(
      (o) => o.phoneNumber === organizer.phoneNumber,
    );

    if (duplicatePhoneNumber.length > 0) {
      throw new DuplicateFieldError('phoneNumber');
    }

    this.organizers.push(organizer);
  }

  async findByEmail(email: string): Promise<OrganizerJson | undefined> {
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
