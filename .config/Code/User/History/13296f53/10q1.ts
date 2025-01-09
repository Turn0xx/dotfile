import { OrganizerRepository } from 'src/pocket-ticket/client/application/organizer.repository';
import {
  Organizer,
  OrganizerJSON,
} from 'src/pocket-ticket/client/domain/organizer';
import { DateProvider } from '../domain/date-provider';
import { DuplicateFieldError } from '../errors/duplicateField.error';

export class InMemoryOrganizerRepository implements OrganizerRepository {
  private organizers: OrganizerJSON[] = [];

  constructor() {}

  async save(organizer: OrganizerJSON) {
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

  async findById(id: number): Promise<Organizer | undefined> {
    const orgJson = this.organizers.find((organizer) => organizer.id === id);
    if (!orgJson) {
      return undefined;
    }

    return Organizer.ofJson(orgJson);
  }

  async findByEmail(email: string): Promise<Organizer | undefined> {
    const orgJson = this.organizers.find(
      (organizer) => organizer.email === email,
    );
    if (!orgJson) {
      return undefined;
    }

    return Organizer.ofJson(orgJson);
  }

  async update(organizer: OrganizerJSON): Promise<void> {
    const orgJson = this.organizers.find((o) => o.id === organizer.id);
    console.log(orgJson);
    if (!orgJson) {
      return;
    }

    this.organizers[this.organizers.indexOf(orgJson)] = organizer;

    orgJson.organizationName = organizer.organizationName;
    orgJson.organizationAddress = organizer.organizationAddress;
    orgJson.email = organizer.email;
    orgJson.phoneNumber = organizer.phoneNumber;
    orgJson.password = organizer.password;
    orgJson.createdAt = organizer.createdAt;
    orgJson.events = organizer.events;
  }
}

export class StubDateProvider implements DateProvider {
  constructor() {}
  now: Date;
  getNow(): Date {
    return this.now;
  }
}
