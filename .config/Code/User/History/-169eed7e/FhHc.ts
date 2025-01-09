import { TokenSchema } from './../../../emails/infrastructure/tokens.schema';
export class InMemoryTokensRepository {

  private tokens: Map<string, TokenSchema> = new Map<string, TokenSchema>();

  constructor() {}

  async insertToken(token: string, userId: number): Promise<void> {
    this.tokens.set(token, { userId });
  }

  


}