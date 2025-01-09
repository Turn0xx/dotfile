import { tokensRepositoryProvider } from './../../../../src/pocket-ticket/notification-services/framework/token-repository.provider';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Repository } from 'typeorm';
import { registrationCommandBuilder } from '../../../../src/pocket-ticket/client/identity/application/commands/registration.command';
import { clientBuilder } from '../../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { ClientSchema } from '../../../../src/pocket-ticket/infrastructure/client.schema';
import { TokenSchema } from '../../../../src/pocket-ticket/notification-services/infrastructure/tokens.schema';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import { dataBaseConfigModule } from '../../../../src/database.config';
import { PgContainer } from '../../../utils/pgContainer.testcontainer';
import { TestContainerTypeOrmConfig } from '../../../utils/typeorm.config';
import {
  RegistrationFixture,
  createRegistrationFixture,
} from '../fixtures/registration.fixture';

import {
  test,
  describe,
  afterAll,
  beforeAll,
  beforeEach,
  afterEach,
} from 'vitest';
import { IndividualClient } from '../../../../src/pocket-ticket/client/identity/domain/individual-client';

import request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('Password Reset Process', async () => {
  let container: PgContainer;

  let app: NestFastifyApplication;
  let regCommandBuilder = registrationCommandBuilder();
  let clBuilder = clientBuilder();
  let authFixture: RegistrationFixture;
  let clientRepository: Repository<ClientSchema>;
  let tokenRepository: Repository<TokenSchema>;
  let fixture: PasswordFixture;
  const testClient = clientBuilder().toIndividualClient('John', 'Doe');


  beforeAll(async () => {
    container = new PgContainer();
    await container.start();
  });

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(dataBaseConfigModule)
      .useModule(
        TestContainerTypeOrmConfig(container.getConfig(), [
          ClientSchema,
          TokenSchema,
        ]),
      )
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    clientRepository = moduleFixture.get('ClientSchemaRepository');
    tokenRepository = moduleFixture.get('TokenSchemaRepository');

    authFixture = createRegistrationFixture({
      app,
      clientRepository,
      tokenRepository,
    });

    fixture = createFixture({
      app,
      authFixture,
      tokensRepository: tokenRepository,
    });

    await fixture.prepare();


  });

  afterAll(async () => {
    await container.stop();
  });

  afterEach(async () => {
    await tokenRepository.clear();
    await clientRepository.delete({});
    await app.close();
  });

  describe('Passing Scenario: Client forgot his password and want to reset', () => {
    
    test('Client should receive a code digit', async () => {

      const response = await fixture.whenUserForgotHisPassword({
        identificator: testClient.build().email,
        type: 'email',
      });

      console.log(response);

      expect(response.status).toBe(200);
    } , 10000);
  });
});

const createFixture = (props: {
  authFixture: RegistrationFixture;
  app: INestApplication;
  tokensRepository: Repository<TokenSchema>;
}) => {
  const { authFixture, app, tokensRepository } = props;
  const testClient = clientBuilder().toIndividualClient('John', 'Doe').build();

  const testClientSchema = IndividualClient.fromJsonToDataModel(testClient);

  return {
    prepare: async () => {
      await authFixture.givenRegistredClient([testClientSchema]);
    },

    whenUserForgotHisPassword: async (payload: {
      identificator: string;
      type: 'email' | 'phone';
    }) => {
      const req = await request(app.getHttpServer())
        .post(
          `/forgot/password?identificator=${payload.identificator}&type=${payload.type}`,
        )
        .send();
      return req;
    },
    thenHeShouldReceiveACodeDigit: async () => {
      const token = await tokensRepository.findOne({
        where: { client: testClientSchema },
      });

      expect(token).toBeDefined();

      return token;
    },
    whenUserEntersTheCode: async (code: string) => {
      const req = await request(app.getHttpServer).get(
        `/forgot/password/validate?token=${code}`,
      );

      return req;
    },
    heThenShouldBeAbleToResetHisPassword: async (newPassword: string) => {},
    thenPasswordShouldBeUpdated: async (
      email: string,
      newPassword: string,
    ) => {},
    thenErrorShouldBe: (error: Error) => {},
  };
};

type PasswordFixture = ReturnType<typeof createFixture>;
