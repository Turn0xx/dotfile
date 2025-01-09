export interface ClientRepository {
  insert(client: Client): Promise<void>;
  save(client: Client): Promise<void>;



}