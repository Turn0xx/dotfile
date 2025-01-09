import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  StartedPostgreSqlContainer,
  PostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Repository, DataSource } from 'typeorm';
import { PROVIDERS } from '../../../src/pocket-ticket/client/providers-strings';
import { TokensRepository } from '../../../src/pocket-ticket/notification-services/infrastructure/tokens.repository';
import { TokenSchema } from '../../../src/pocket-ticket/notification-services/infrastructure/tokens.schema';
import { TokensTypeormRepository } from '../../../src/pocket-ticket/notification-services/infrastructure/tokens.typeorm';
import { ClientSchema } from '../../../src/pocket-ticket/infrastructure/client.schema';
import exp from 'constants';
import { individualClientBuilder } from '../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { IndividualClient } from '../../../src/pocket-ticket/client/identity/domain/individual-client';

const dataBaseTestConfig = {
  database: 'pocket-ticket',
  username: 'postgres',
  password: 'pocket',
  port: 5432,
};

describe('TokensTypeormRepository', () => {
  let container: StartedPostgreSqlContainer;
  let testModule: TestingModule;
  let tokensRepository: TokensRepository;
  let typeormRepository: Repository<TokenSchema>;
  let typeormClientRepository: Repository<ClientSchema>;
  let thrownError: Error;

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
    thrownError = undefined;
    testModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          database: dataBaseTestConfig.database,
          username: dataBaseTestConfig.username,
          password: dataBaseTestConfig.password,
          host: container.getHost(),
          port: container.getMappedPort(dataBaseTestConfig.port),
          entities: [TokenSchema, ClientSchema],
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

        {
          provide: 'TYPEORM_CLIENT_REPOSITORY',
          useFactory: (datasource: DataSource) => {
            return datasource.getRepository(ClientSchema);
          },
          inject: [DataSource],
        },
      ],
    }).compile();

    datasource = testModule.get<DataSource>(DataSource);
    tokensRepository = testModule.get<TokensRepository>(
      PROVIDERS.TOKENS_REPOSITORY,
    );
    typeormRepository = testModule.get('TYPEORM_TOKENS_REPOSITORY');
    typeormClientRepository = testModule.get('TYPEORM_CLIENT_REPOSITORY');

    await typeormClientRepository.save(
      IndividualClient.fromJsonToDataModel(individualClientBuilder().build()),
    );
  });

  afterEach(async () => {
    await typeormRepository.delete({});
    await typeormClientRepository.delete({});
  });

  afterAll(async () => {
    await container.stop();
  });

  it('should be defined', () => {
    const app = testModule;
    expect(app).toBeDefined();
    expect(tokensRepository).toBeDefined();
    expect(typeormRepository).toBeDefined();
    expect(typeormClientRepository).toBeDefined();
  });

  describe('insertToken', () => {
    it('should insert a token', async () => {
      await tokensRepository.insertToken('token', '1');
      const token = await typeormRepository.findOne({
        where: { token: 'token' },
      });

      expect(token).toBeDefined();
      expect(token.token).toBe('token');
      expect(token.type).toBe('EMAIL_VALIDATION');
    });

    it('should throw an error when the client does not exist', async () => {
      try {
        await tokensRepository.insertToken('token', 2);
      } catch (error) {
        thrownError = error;
      }
      expect(thrownError).toBeDefined();
    });


    it('should throw an error when the token is empty', async () => {
      try {
        await tokensRepository.insertToken(null, '1');
      } catch (error) {
        thrownError = error;
      }
      expect(thrownError).toBeDefined();
    });
  });

  describe('getTokenByUserId', () => {
    it('should get a token by user id', async () => {
      await tokensRepository.insertToken('token', '1');
      const token = await tokensRepository.getTokenByUserId('1');

      expect(token).toBeDefined();
      expect(token.token).toBe('token');
      expect(token.type).toBe('EMAIL_VALIDATION');
    });

    it('should return undefined when the token does not exist', async () => {
      const token = await tokensRepository.getTokenByUserId('1');

      expect(token).toBeUndefined();
    });
  });


  describe('insertDigitCode', () => {
    it('should insert a digit code', async () => {
      await tokensRepository.insertDigitCode('digitCode', '1');
      const token = await typeormRepository.findOne({
        where: { token: 'digitCode' },
      });

      expect(token).toBeDefined();
      expect(token.token).toBe('digitCode');
      expect(token.type).toBe('PASSWORD_RESET');
    });

    it('should throw an error when the client does not exist', async () => {
      try {
        await tokensRepository.insertDigitCode('digitCode', 2);
      } catch (error) {
        thrownError = error;
      }
      expect(thrownError).toBeDefined();
    });

    it('should throw an error when the token is empty', async () => {
      try {
        await tokensRepository.insertDigitCode(null, '1');
      } catch (error) {
        thrownError = error;
      }
      expect(thrownError).toBeDefined();
    });
  });


  describe('getDigitCodeByClientId', () => {
    it('should get a digit code by client id', async () => {
      await tokensRepository.insertDigitCode('digitCode', '1');
      const token = await tokensRepository.getDigitCodeByClientId('1');

      expect(token).toBeDefined();
      expect(token.token).toBe('digitCode');
      expect(token.type).toBe('PASSWORD_RESET');
    });

    it('should return undefined when the token does not exist', async () => {
      const token = await tokensRepository.getDigitCodeByClientId('1');

      expect(token).toBeUndefined();
    });
  });
});
