import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { ClientRepository } from '../application/client.repository';
import { Client } from '../domain/client';
import { DuplicateFieldError } from '../errors/duplicateField.error';

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

  insert(client: ClientSchema): Promise<void> {

    console.log('client', client);

    const clientt = Client.fromJson(client);

    console.log('clientt', clientt);

    this.checkUniqueFields(clientt);

    this.clients.set(clientt.Id, clientt);

    return Promise.resolve();
  }

  save(client: Client): Promise<void> {
    if (!this.clients.has(client.Id)) {
      throw new Error('Client not found');
    }

    this.clients.set(client.Id, client);

    return Promise.resolve();
  }

  findById(id: number): Promise<Client | undefined> {
    return Promise.resolve(this.clients.get(id));
  }

  findByEmail(email: string): Promise<Client | undefined> {
    return Promise.resolve(
      Array.from(this.clients.values()).find((c) => c.Email === email),
    );
  }
}
