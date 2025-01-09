import { TokenSchema } from './../../../emails/infrastructure/tokens.schema';
export class InMemoryTokensRepository {

  private tokens: Map<string, TokenSchema> = new Map<string, TokenSchema>();

  constructor() {}

  async insertToken(token: string, userId: number): Promise<void> {
    this.tokens.set(token, { 
      id: Math.floor(Math.random() * 1000),
      token: token,
      client: { id: userId },
      createdAt: new Date()
    });
  }




}