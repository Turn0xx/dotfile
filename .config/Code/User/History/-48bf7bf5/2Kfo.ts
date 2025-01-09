export class TokensTypeormRepository implements TokensRepository {
    constructor(private readonly repository: Repository<TokenSchema>) {}

    async insertToken(token: string, clientId: number): Promise<void> {
        await this.repository.insert({ token, client: { id: clientId } });
    }

    async getTokenByUserId(userId: number): Promise<string> {
        const token = await this.repository.findOne({ where: { client: { id: userId } } });
        return token.token;
    }
}