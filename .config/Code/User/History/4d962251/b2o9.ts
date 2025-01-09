import { clientBuilder } from '../../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import {
  registrationCommandBuilder,
} from '../../../../src/pocket-ticket/client/identity/application/commands/registration.command';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Repository } from 'typeorm';
import { ClientSchema } from '../../../../src/pocket-ticket/infrastructure/client.schema';
import { TokenSchema } from '../../../../src/pocket-ticket/notification-services/infrastructure/tokens.schema';
import { dataBaseConfigModule } from '../../../../src/database.config';
import { IndividualClient } from '../../../../src/pocket-ticket/client/identity/domain/individual-client';
import { DatabaseContainer } from '../../../utils/container';
import { PgContainer } from '../../../utils/pgContainer.testcontainer';
import { TestContainerTypeOrmConfig } from '../../../utils/typeorm.config';
import { RegistrationFixture, createRegistrationFixture } from '../fixtures/registration.fixture';

import { test , describe , afterAll , beforeAll , beforeEach , afterEach } from 'vitest';
import { FakeEmailSender } from '../../../../src/pocket-ticket/notification-services/emails/test/email-sender.fake';
import { PROVIDERS } from '../../../../src/pocket-ticket/client/providers-strings';

describe('Registrations Utilities', () => {
  let container: DatabaseContainer;

  let app: NestFastifyApplication;
  let regCommandBuilder = registrationCommandBuilder();
  let clBuilder = clientBuilder();
  let fixture: RegistrationFixture;
  let clientRepository: Repository<ClientSchema>;
  let tokenRepository: Repository<TokenSchema>;

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
        ])
      )
      .overrideProvider(PROVIDERS.EMAIL_VALIDATION_SERVICE).useClass(FakeEmailSender)
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter({ logger: true }),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    clientRepository = moduleFixture.get('ClientSchemaRepository');
    tokenRepository = moduleFixture.get('TokenSchemaRepository');

    fixture = createRegistrationFixture({
      app,
      clientRepository,
      tokenRepository,
    });
  });

  afterEach(async () => {
    await tokenRepository.clear();
    await clientRepository.delete({});
    await app.close();
  });

  afterAll(async () => {
    await container.stop();
  });

  describe('Registration : ', async () => {
    describe('should register a new user', () => {
      test('As an individual client', async () => {
        const payload = regCommandBuilder
          .withEmail('elhilali.mad@gmail.com')
          .toIndividualClient('John', 'Doe')
          .build();

        const response = await fixture.registerClient(payload);

        expect(response.status).toBe(201);

        const client = await clientRepository.findOne({
          where: { email: payload.email },
        });

        expect(client).toBeDefined();
        expect(client.accountType).toBe('individual');
      });

      test('As a company client', async() => {
        const payload = regCommandBuilder.toCompanyClient('Souche').build();
        const response = await fixture.registerClient(payload);

        expect(response.status).toBe(HttpStatus.CREATED);

        const client = await clientRepository.findOne({
          where: { email: payload.email },
        });

        expect(client).toBeDefined();
        expect(client.accountType).toBe('company');
      });
    });

    describe('should not register a new user', () => {
      test('if email is already taken', async () => {
        const client = clBuilder
          .withEmail('email@gmail.com')
          .toIndividualClient('John', 'Doe')
          .build();
        await fixture.givenRegistredClient([
          IndividualClient.fromJsonToDataModel(client),
        ]);

        const payload = regCommandBuilder
          .toIndividualClient('John', 'Doe')
          .withEmail('email@gmail.com')
          .build();

        const response = await fixture.registerClient(payload);

        expect(response.status).toBe(HttpStatus.CONFLICT);
      });
    });
  });

  describe('Email Account Validation : ', () => {
    test('should validate a client email', async () => {
      const registrationCommand = regCommandBuilder
        .toIndividualClient('John', 'Doe')
        .build();

      await fixture.registerClient(registrationCommand);

      await fixture.loginClient({
        username: registrationCommand.email,
        password: registrationCommand.password,
      });

      const token = await tokenRepository.findOne({
        where: { client: { email: registrationCommand.email } },
      });

      //console.log(token);

      const response = await fixture.validateEmail(token.token);

      //     console.log(response);

      expect(response.status).toBe(HttpStatus.OK);

      const client = await clientRepository.findOne({
        where: { email: registrationCommand.email },
      });

      expect(client.isVerified).toBeTruthy();
    });

    test('should not validate a client email if token is invalid', async () => {
      const registrationCommand = regCommandBuilder
        .toIndividualClient('John', 'Doe')
        .build();

      await fixture.registerClient(registrationCommand);

      await fixture.loginClient({
        username: registrationCommand.email,
        password: registrationCommand.password,
      });

      const response = await fixture.validateEmail('invalidToken');

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
