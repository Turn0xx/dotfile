import { ClientRepository } from "../application/client.repository";
import { Client } from "../domain/client";

export class InMemoryClientRepository implements ClientRepository {

  private uniqueFields = ['email', 'phoneNumber'];

  private clients: Map<number, Client> = new Map<number , Client>();

  constructor() {}

  
  
}