import { ClientSchema } from '../../../infrastructure/client.schema';
import { Client } from '../domain/client';

export interface ClientRepository {
  insert(client: ClientSchema): Promise<ClientSchema>;
  save(client: ClientSchema): Promise<ClientSchema>;
  findById(id: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  findByPhone(phone: string): Promise<Client | undefined>;
  verifyClient(id: string): Promise<void>;
}
