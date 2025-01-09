
import { OrganizerSchema } from '../infrastructure/organizer.schema';
import { EventBasicInformation, EventBasicInformations } from './basic-information';
import { Event } from './event';

class Email {
  private constructor(private readonly email: string) {}

  static fromValue(email: unknown , validator ?: (value: unknown) => boolean): Email {
    if (validator) {
      if (!validator(email)) {
        throw new Error('Invalid email');
      }
    }
    return new Email(email as string);
  }

  toString(): string {
    return this.email;
  }

  equals(email: Email): boolean {
    return this.email === email.toString();
  }
}

class Password {
  private constructor(private readonly password: string) {}

  static fromValue(password: unknown , validator ?: (value: unknown) => boolean): Password {

    if (validator) {
      if (!validator(password)) {
        throw new Error('Invalid password');
      }
    }

    return new Password(password as string);
  }

  toString(): string {
    return this.password;
  }

  equals(password: Password): boolean {
    return this.password === password.toString();
  }
}



export type OrganizerJson = {
  id: number;
  organizationName: string;
  email: string;
  password: string;
  username: string;
  organizationAddress: string;
  phoneNumber: string;
  events: Event[];
  createdAt: Date;
};

export class Organizer {
  private constructor(
    private readonly id: number,
    private organizationName: string,
    private email: string,
    private password: string,
    private username: string,
    private organizationAddress: string,
    private phoneNumber: string,
    private readonly createdAt: Date,
    private events: Event[],
  ) {}


  static fromJson(json: OrganizerJson): Organizer {
    return new Organizer(
      json.id,
      json.organizationName,
      json.email,
      json.password,
      json.username,
      json.organizationAddress,
      json.phoneNumber,
      json.createdAt,
      json.events,
    );
  }

  static fromDataModel(dataModel: OrganizerSchema): Organizer {
    return new Organizer(
      dataModel.id,
      dataModel.organizationName,
      dataModel.email,
      dataModel.password,
      dataModel.username,
      dataModel.organizationAddress,
      dataModel.phoneNumber,
      dataModel.createdAt,
      dataModel.events.map((event) => Event.fromDataModel(event)),
    );
  }

  toJson(): OrganizerJson {
    return {
      id: this.id,
      organizationName: this.organizationName,
      email: this.email,
      password: this.password,
      username: this.username,
      organizationAddress: this.organizationAddress,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      events: this.events,
    };
  }

  toDataModel(): OrganizerSchema {

    let events = this.events.map((event) => event.toDataModel());


    const organizer = new OrganizerSchema();
    organizer.id = this.id;
    organizer.organizationName = this.organizationName;
    organizer.email = this.email;
    organizer.password = this.password;
    organizer.username = this.username;
    organizer.organizationAddress = this.organizationAddress;
    organizer.phoneNumber = this.phoneNumber;
    organizer.createdAt = this.createdAt;
    organizer.events = events;
    return organizer;

  }

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getEvents(): Event[] {
    return this.events;
  }


  initializeEvent(basicInfos: EventBasicInformations): void {
    const json = basicInfos.toJson();
    this.events.push(
      Event.fromJson({
        id: json.id,
        basicInformations: basicInfos,
        createdAt: json.createdAt,
        isPublished: false,
      }),
    );
  }
}