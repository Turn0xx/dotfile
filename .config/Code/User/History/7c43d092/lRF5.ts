import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StartedPostgreSqlContainer, PostgreSqlContainer } from "@testcontainers/postgresql";
import { Repository, DataSource } from "typeorm";
import { PROVIDERS } from "../../../src/pocket-ticket/client/providers-strings";
import { TokensRepository } from "../../../src/pocket-ticket/notification-services/infrastructure/tokens.repository";
import { TokenSchema } from "../../../src/pocket-ticket/notification-services/infrastructure/tokens.schema";
import { TokensTypeormRepository } from "../../../src/pocket-ticket/notification-services/infrastructure/tokens.typeorm";

const dataBaseTestConfig = {
  database: 'pocket-ticket',
  username: 'postgres',
  password: 'pocket',
  port: 5432,
}

describe('TokensTypeormRepository', () => {
  let container: StartedPostgreSqlContainer;
  let testModule: TestingModule;
  let tokensRepository: TokensRepository;
  let typeormRepository: Repository<TokenSchema>;
  let thrownError: Error;

  let tokenStub = tokenBuilder().withCreatedAt(new Date());

  let datasource: DataSource;

  beforeAll(async () => {
    container = await new PostgreSqlContainer()
      .withUsername(dataBaseTestConfig.username)
      .withDatabase(dataBaseTestConfig.database)
      .withPassword(dataBaseTestConfig.password)
      .withExposedPorts(dataBaseTestConfig.port)
      .start();
  }, 60000);

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          database: dataBaseTestConfig.database,
          username: dataBaseTestConfig.username,
          password: dataBaseTestConfig.password,
          host: container.getHost(),
          port: container.getMappedPort(dataBaseTestConfig.port),
          entities: [TokenSchema],
          synchronize: true,
        }),
      ],

      providers: [
        {
          provide: PROVIDERS.TOKENS_REPOSITORY,
          useFactory: (datasource: DataSource) => {
            return new TokensTypeormRepository(
              datasource.getRepository(TokenSchema),
            );
          },
          inject: [DataSource],
        },

        {
          provide: 'TYPEORM_TOKENS_REPOSITORY',
          useFactory: (datasource: DataSource) => {
            return datasource.getRepository(TokenSchema);
          },
          inject: [DataSource],
        },
      ],
    }).compile();

    datasource = testModule.get<DataSource>(DataSource);
    tokensRepository = testModule.get<TokensRepository>(PROVIDERS.TOKENS_REPOSITORY);
    typeormRepository = testModule.get('TYPEORM_TOKENS_REPOSITORY');
  });

  afterEach(async () => {
    await typeormRepository.delete({});
  });

  afterAll(async () => {
    await container.stop();
  });

  describe('insertToken', () => {
    it('should insert a token', async () => {
      await tokensRepository.insertToken(tokenStub.token, tokenStub.client.id);

      const token = await typeormRepository.findOne({
        where: { token: tokenStub.token },
      });

      expect(token).toBeDefined();
    });
  });
});