import { Inject } from "@nestjs/common";
import { ClientSchema } from "src/pocket-ticket/infrastructure/client.schema";
import { Repository } from "typeorm";
import { ClientRepository } from "../domain/client.repository

export class ClientTypeOrmRepository implements ClientRepository { 
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: Repository<ClientSchema>
  ) {}
}