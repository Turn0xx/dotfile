import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Email } from './value-objetcs/email';
import { Password } from './value-objetcs/password';
import { PhoneNumber } from './value-objetcs/phone-number';
import { IndividualClient, IndividualClientJson } from './individual-client';

export type ClientJson = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
};

export abstract class Client {
  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly createdAt: Date,
  ) {}

  abstract toJson(): ClientJson;

  abstract fromJson(json: ClientJson): Client;

  abstract fromDataModel(dataModel: ClientSchema): Client;

  abstract toDataModel(): Partial<ClientSchema>;
}
