import { OrganizerRepository } from "src/pocket-ticket/client/application/organizer.repository";
import { Organizer, OrganizerJSON } from "src/pocket-ticket/client/domain/organizer";
import { DateProvider } from "../domain/date-provider";
import { DuplicateFieldError } from "../errors/duplicateField.error";

export class InMemoryOrganizerRepository implements OrganizerRepository {
  private organizers: OrganizerJSON[] = [];

  constructor() {
    console.log('InMemoryOrganizerRepository');
  }

  async save(organizer: OrganizerJSON) {

    const updateOrSave = this.organizers.find((o) => o.id === organizer.id);


    if (updateOrSave) {
      updateOrSave.organizationName = organizer.organizationName;
      updateOrSave.organizationAddress = organizer.organizationAddress;
      updateOrSave.email = organizer.email;
      updateOrSave.phoneNumber = organizer.phoneNumber;
      updateOrSave.password = organizer.password;
      updateOrSave.createdAt = organizer.createdAt;
      updateOrSave.events = organizer.events;
      return;
    }

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

  async findByEmail(email: string): Promise<Organizer| undefined> {

    const orgJson = this.organizers.find((organizer) => organizer.email === email);
    if (!orgJson) {
      return undefined;
    }

    return Organizer.ofJson(orgJson);
  }
}

export class StubDateProvider implements DateProvider {
  constructor() {
    console.log('StubDateProvider');
  }
  now: Date;
  getNow(): Date {
    return this.now;
  }
}