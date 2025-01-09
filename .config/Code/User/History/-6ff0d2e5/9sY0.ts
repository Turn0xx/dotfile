import { Inject } from "@nestjs/common";
import { ClientSchema } from "src/pocket-ticket/infrastructure/client.schema";
import { Repository } from "typeorm";

export class ClientTypeOrmRepository { 
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: Repository<ClientSchema>
  )
}