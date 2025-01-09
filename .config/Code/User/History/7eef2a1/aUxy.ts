import { ClientSchema } from "src/pocket-ticket/infrastructure/client.schema";
import { Client } from "../domain/client";

export interface ClientRepository {
  insert(client: ClientSchema): Promise<void>;
  save(client: Client): Promise<void>;
  findById(id: number): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
}