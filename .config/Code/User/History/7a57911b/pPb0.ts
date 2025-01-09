import { ClientRepository } from "../client.repository";

export class ResetPasswordUseCase {

  constructor(
    private readonly userRepository: ClientRepository,
  ) {}

  async handle() {
    
  }

}