import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";

export class ClientTypeOrmRepository { 
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: Repository<ClientSchema>
  )
}