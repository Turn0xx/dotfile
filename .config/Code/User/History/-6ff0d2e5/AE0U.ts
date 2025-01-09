import { Inject } from "@nestjs/common";
import { ClientSchema } from "src/pocket-ticket/infrastructure/client.schema";
import { Repository } from "typeorm";
import { ClientRepository } from "../application/client.repository"
import { Client } from "../domain/client";

export class ClientTypeOrmRepository implements ClientRepository { 
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: Repository<ClientSchema>
  ) {}


  async insert(client: Client): Promise<void> {

    try {
      await this.clientRepository.insert(client.toDataModel());      
    } catch (error) {
      throw new Error(error);
    }

  }


  save(client: Client): Promise<void> {
    
  }


  findById(id: number): Promise<Client> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Client> {
    throw new Error("Method not implemented.");
  }

}