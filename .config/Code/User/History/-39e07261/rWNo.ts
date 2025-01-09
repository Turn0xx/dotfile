import { TokensRepository } from '../../../notification-services/infrastructure/tokens.repository';
import {
  TokenSchema,
  TokenType,
} from '../../../notification-services/infrastructure/tokens.schema';

type TokenInMemoryDataModel = {
  id: number;
  token: string;
  client: { id: number };
  type: TokenType;
  createdAt: Date;
};

export class InMemoryTokensRepository implements TokensRepository {
  private tokens: Map<string, TokenInMemoryDataModel> = new Map<
    string,
    TokenInMemoryDataModel
  >();

  constructor() {}

  async insertToken(token: string, userId: string): Promise<void> {
    this.tokens.set(token, {
      id: Math.floor(Math.random() * 1000),
      token: token,
      client: { id: userId },
      type: TokenType.EMAIL_VALIDATION,
      createdAt: new Date(),
    });

    return Promise.resolve();
  }

  async getTokenByUserId(userId: string): Promise<TokenSchema | undefined> {
    return await Promise.resolve(
      Array.from(this.tokens.values()).find(
        (c) => c.client.id === userId,
      ) as TokenSchema,
    );
  }

  async insertDigitCode(digitCode: string, clientId: string): Promise<void> {
    this.tokens.set(digitCode, {
      id: Math.floor(Math.random() * 1000),
      token: digitCode,
      client: { id: clientId },
      type: TokenType.PASSWORD_RESET,
      createdAt: new Date(),
    });

    return Promise.resolve();
  }

  async getDigitCodeByClientId(
    clientId: string,
  ): Promise<TokenSchema | undefined> {
    return await Promise.resolve(
      Array.from(this.tokens.values()).find(
        (c) => c.client.id === clientId && c.type === TokenType.PASSWORD_RESET,
      ) as TokenSchema,
    );
  }

  async getDigitCode(digitCode: string): Promise<TokenSchema | undefined> {
    return await Promise.resolve(this.tokens.get(digitCode) as TokenSchema);
  }
}
