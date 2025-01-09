import { Client } from "../domain/client";

export class ClientRepository implements ClientRepository {
  constructor(private readonly clientRepository: ClientRepository) {}

  async insert(client: Client): Promise<void> {
    return this.clientRepository.insert(client);
  }

  async save(client: Client): Promise<void> {
    return this.clientRepository.save(client);
  }

  async findById(id: number): Promise<Client | undefined> {
    return this.clientRepository.findById(id);
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    return this.clientRepository.findByEmail(email);
  }
}