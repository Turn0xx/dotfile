import { ClientRepository } from '../application/repositories/client.repository';
import { Client } from '../domain/client';
import { DuplicateFieldError } from '../errors/duplicateField.error';
import { CompanyClient } from '../domain/company-client';
import { IndividualClient } from '../domain/individual-client';
import { ClientSchema, AccountTypeEnum } from '../../../infrastructure/client.schema';

export class InMemoryClientRepository implements ClientRepository {
  private uniqueFields = ['email', 'phoneNumber'];

  private clients: Map<number, Client> = new Map<number, Client>();

  constructor() {}

  private checkUniqueFields(client: Client): void {
    this.uniqueFields.forEach((field) => {
      const isUnique = Array.from(this.clients.values()).every((c) => {
        // console.log('c', c);
        c[field] !== client[field];
      });
      if (!isUnique) {
        throw new DuplicateFieldError(field);
      }
    });
  }

  async insert(client: ClientSchema): Promise<ClientSchema> {

    const difiriencedClient = client.accountType === AccountTypeEnum.INDIVIDUAL ? IndividualClient.fromDataModel(client) : CompanyClient.fromDataModel(client);
    
    this.checkUniqueFields(difiriencedClient);

    this.clients.set(difiriencedClient.Id, difiriencedClient);

    return Promise.resolve(difiriencedClient.toDataModel());
  }

  save(clientSchema: ClientSchema): Promise<ClientSchema> {

    const client = clientSchema.accountType === AccountTypeEnum.INDIVIDUAL ? IndividualClient.fromDataModel(clientSchema) : CompanyClient.fromDataModel(clientSchema);

    if (!this.clients.has(client.Id)) {
      throw new Error('Client not found');
    }

    this.clients.set(client.Id, client);

    return Promise.resolve(client.toDataModel());
  }

  findById(id: number): Promise<Client | undefined> {
    return Promise.resolve(this.clients.get(id));
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    return await Promise.resolve(
      Array.from(this.clients.values()).find((c) => c.Email === email),
    );
  }

  async verifyClient(id: number): Promise<void> {
    console.log('verify client', id);
    const client = this.clients.get(id);
    if (!client) {
      throw new Error('Client not found');
    }
    client.verify();
    this.clients.set(id, client);
  }
}
