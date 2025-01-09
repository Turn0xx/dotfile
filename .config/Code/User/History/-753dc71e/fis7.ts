import exp from 'constants';
import { ValueObject } from '../application/value-object.base';
import { OrganizerSchema } from '../infrastructure/organizer.schema';
import {
  EventBasicInformation,
  EventBasicInformations,
} from './basic-information--';
import { Event } from './event';
import { Email } from './value-objetcs/email';
import { emailValidator } from '../application/validators/email.validator';
import { Password } from './value-objetcs/password';
import { Address } from './value-objetcs/adress';
import { PhoneNumber } from './value-objetcs/phone-number';
import { passwordValidator } from '../application/validators/password.validator';
import { addressValidator } from '../application/validators/adress.validator';
import { phoneValidator } from '../application/validators/phone.validator';


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
    private email: Email,
    private password: Password,
    private username: string,
    private organizationAddress: Address,
    private phoneNumber: PhoneNumber,
    private readonly createdAt: Date,
    private events: Event[],
  ) {}

  static fromJson(json: OrganizerJson): Organizer {
    return new Organizer(
      json.id,
      json.organizationName,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      json.username,
      Address.fromValue(json.organizationAddress),
      PhoneNumber.fromValue(json.phoneNumber),
      json.createdAt,
      json.events,
    );
  }

  static fromDataModel(dataModel: OrganizerSchema): Organizer {
    return new Organizer(
      dataModel.id,
      dataModel.organizationName,
      Email.fromValue(dataModel.email),
      Password.fromValue(dataModel.password),
      dataModel.username,
      Address.fromValue(dataModel.organizationAddress),
      PhoneNumber.fromValue(dataModel.phoneNumber),
      dataModel.createdAt,
      dataModel.events.map((event) => Event.fromDataModel(event)),
    );
  }

  toJson(): OrganizerJson {
    return {
      id: this.id,
      organizationName: this.organizationName,
      email: this.email.unpack(),
      password: this.password.unpack(),
      username: this.username,
      organizationAddress: this.organizationAddress.unpack(),
      phoneNumber: this.phoneNumber.unpack(),
      createdAt: this.createdAt,
      events: this.events,
    };
  }

  toDataModel(): OrganizerSchema {
    let events = this.events.map((event) => event.toDataModel());

    const organizer = new OrganizerSchema();
    organizer.id = this.id;
    organizer.organizationName = this.organizationName;
    organizer.email = this.email.unpack();
    organizer.password = this.password.unpack();
    organizer.username = this.username;
    organizer.organizationAddress = this.organizationAddress.unpack();
    organizer.phoneNumber = this.phoneNumber.unpack() ;
    organizer.createdAt = this.createdAt;
    organizer.events = events;
    return organizer;
  }

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email.unpack();
  }

  getPhoneNumber(): string {
    return this.phoneNumber.unpack();
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
