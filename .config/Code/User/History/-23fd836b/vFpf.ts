import { TokenSchema } from "../../infrastructure/tokens.schema";

export interface TokensRepository {
    insertToken(token: string, clientId: number): Promise<void>;
    getTokenByUserId(userId: number): Promise<TokenSchema>;
}