import { TokenSchema } from "./tokens.schema";

export interface TokensRepository {
    insertToken(token: string, clientId: number): Promise<void>;
    getTokenByUserId(userId: number): Promise<TokenSchema>;
    insertDigitCode(digitCode: string , clientId: number): Promise<void>;
    getDigitCodeByClientId(clientId: number): Promise<TokenSchema>;
}