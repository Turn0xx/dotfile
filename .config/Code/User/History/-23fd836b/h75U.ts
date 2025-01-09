import { TokenSchema } from './tokens.schema';

export interface TokensRepository {
  insertToken(token: string, clientId: string): Promise<void>;
  getTokenByUserId(userId: string): Promise<TokenSchema>;
  insertDigitCode(digitCode: string, clientId: string): Promise<void>;
  getDigitCodeByClientId(clientId: string): Promise<TokenSchema>;
  getDigitCode(digitCode: string): Promise<TokenSchema>;
}
