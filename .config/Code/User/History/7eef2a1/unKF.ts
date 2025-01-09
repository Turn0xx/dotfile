import { ClientSchema } from "src/pocket-ticket/infrastructure/client.schema";
import { Client } from "../domain/client";

export interface ClientRepository {
  insert(client: ClientSchema): Promise<ClientSchema>;
  save(client: ClientSchema): Promise<ClientSchema>;
  findById(id: number): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
}