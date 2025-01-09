import { ClientRepository } from "../application/client.repository";
import { Client } from "../domain/client";
import { DuplicateFieldError } from "../errors/duplicateField.error";

export class InMemoryClientRepository implements ClientRepository {

  private uniqueFields = ['email', 'phoneNumber'];

  private clients: Map<number, Client> = new Map<number , Client>();

  constructor() {}

  private checkUniqueFields(client: Client): void {
    this.uniqueFields.forEach((field) => {
      const isUnique = Array.from(this.clients.values()).every(
        (c) => c[field] !== client[field]
      );
      if (!isUnique) {
        throw new DuplicateFieldError(field);
      }
    });
  }


  insert(client: Client): Promise<void> {
    this.checkUniqueFields(client);

    return await this.clients.set(client.toJson().id, client);
  }
  save(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<Client> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Client> {
    throw new Error("Method not implemented.");
  }

  
  
}