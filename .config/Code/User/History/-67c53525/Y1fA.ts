import { IndividualClient, IndividualClientJson } from './individual-client';
import { ClientSchema } from '../../../infrastructure/client.schema';
import { Email, Password, PhoneNumber } from '@shared/bases/value-objects';

export type ClientJson = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  isVerified: boolean;
};

export abstract class Client {

  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly createdAt: Date,
    protected isVerified: boolean
  ) {}

  abstract toJson(): ClientJson;

  // static fromJson(json: ClientJson): Client {};

  // static fromDataModel(dataModel: ClientSchema): Client;

  abstract toDataModel(): Partial<ClientSchema>;

  verify(): void {
    this.isVerified = true;
  }

  get Id(): number {
    return this.id;
  }

  get Email(): string {
    return this.email.unpack();
  }

  get IsVerified(): boolean {
    return this.isVerified;
  }
}