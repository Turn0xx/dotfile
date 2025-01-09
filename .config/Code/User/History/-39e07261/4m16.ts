import { TokensRepository } from '../../../emails/application/tokens.repository';
import { TokenSchema } from '../../../emails/infrastructure/tokens.schema';

type TokenInMemoryDataModel = {
  id: number;
  token: string;
  client: { id: number };
  createdAt: Date;
}

export class InMemoryTokensRepository implements TokensRepository{

  private tokens: Map<string, TokenInMemoryDataModel> = new Map<string, TokenInMemoryDataModel>();

  constructor() {} 

  async insertToken(token: string, userId: number): Promise<void> {
    this.tokens.set(token, { 
      id: Math.floor(Math.random() * 1000),
      token: token,
      client: { id: userId },
      createdAt: new Date()
    });

    return Promise.resolve();
  }

  async getTokenByUserId(userId: number): Promise<TokenSchema | undefined> {
    return await Promise.resolve(
      Array.from(this.tokens.values()).find((c) => c.client.id === userId) as TokenSchema
    );
  }
}