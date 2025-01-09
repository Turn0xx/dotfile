import { Inject } from "@nestjs/common";
import { ClientSchema } from "src/pocket-ticket/infrastructure/client.schema";
import { Repository } from "typeorm";
import { ClientRepository } from "../application/client.repository"
import { Client } from "../domain/client";

export class ClientTypeOrmRepository implements ClientRepository { 
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: Repository<ClientSchema>
  ) {}

  
  insert(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
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