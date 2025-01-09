import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PROVIDERS } from "../../client/providers-strings";
import { TokenSchema } from "../infrastructure/tokens.schema";
import { TokensTypeormRepository } from "../infrastructure/tokens.typeorm";

export const tokensRepositoryProvider = {
  provide: PROVIDERS.TOKENS_REPOSITORY,
  useFactory: (repository: Repository<TokenSchema>) => {
    return new TokensTypeormRepository(repository);
  },
  inject: [getRepositoryToken(TokenSchema)],
};