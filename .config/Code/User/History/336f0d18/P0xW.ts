import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientSchema } from "../../../../infrastructure/client.schema";
import { PROVIDERS } from "../../../providers-strings";
import { ClientTypeOrmRepository } from "../../infrastructure/client.typeorm";

const clientRepositoryProvider = {
  provide: PROVIDERS.CLIENT_REPOSITORY,
  useFactory: (organizerRepository: Repository<ClientSchema>) => {
    return new ClientTypeOrmRepository(organizerRepository);
  },
  inject: [getRepositoryToken(ClientSchema)],
};
