import { Inject } from "@nestjs/common";

export class ClientTypeOrmRepository { 
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: any
  )
}