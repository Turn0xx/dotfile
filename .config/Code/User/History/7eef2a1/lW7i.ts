import { Client } from "../domain/client";

export interface ClientRepository {
  insert(client: Client): Promise<void>;
  save(client: Client): Promise<void>;
  findById(id: number): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
}