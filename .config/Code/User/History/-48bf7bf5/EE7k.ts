import { Repository } from 'typeorm';
import { TokensRepository } from './tokens.repository';
import { TokenSchema, TokenType } from './tokens.schema';

export class TokensTypeormRepository implements TokensRepository {
  constructor(private readonly repository: Repository<TokenSchema>) {}

  async insertToken(token: string, clientId: number): Promise<void> {
    await this.repository.insert({ token, client: { id: clientId } });
  }

  async getTokenByUserId(userId: number): Promise<TokenSchema | undefined> {
    const token = await this.repository.findOne({
      where: { client: { id: userId } },
    });
    return token ? token : undefined;
  }

  async insertDigitCode(digitCode: string, clientId: number): Promise<void> {
    await this.repository.insert({
      token: digitCode,
      client: { id: clientId },
      type: TokenType.PASSWORD_RESET,
    });
  }

  async getDigitCodeByClientId(
    clientId: number,
  ): Promise<TokenSchema | undefined> {
    const token = await this.repository.findOne({
      where: { client: { id: clientId }, type: TokenType.PASSWORD_RESET },
    });
    return token ? token : undefined;
  }

  async getDigitCode(digitCode: string): Promise<TokenSchema | undefined> {
    const token = await this.repository.findOne({
      where: { token: digitCode, type: TokenType.PASSWORD_RESET },
    });
    return token ? token : undefined;
  }
}
