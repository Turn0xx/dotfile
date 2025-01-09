import { PROVIDERS } from './../../../src/pocket-ticket/client/providers-strings';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientRepository } from 'src/pocket-ticket/client/authentification/application/client.repository';
import { clientBuilder } from 'src/pocket-ticket/client/authentification/test/builders/client.builder';
import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Repository, DataSource } from 'typeorm';
import { ClientTypeOrmRepository } from 'src/pocket-ticket/client/authentification/infrastructure/client.typeorm';
import { IndividualClient } from 'src/pocket-ticket/client/authentification/domain/individual-client';

const dataBaseTestConfig = {
  database: 'pocket-ticket',
  username: 'postgres',
  password: 'pocket',
  port: 5432,
};

describe('ClientTypeormRepository', () => {
  let container: StartedPostgreSqlContainer;
  let testModule: TestingModule;
  let clientRepository: ClientRepository;
  let typeormRepository: Repository<ClientSchema>;
  let thrownError: Error;

  let clientStub = clientBuilder().withCreatedAt(new Date());

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
          entities: [ClientSchema],
          synchronize: true,
        }),
      ],

      providers: [
        {
          provide: PROVIDERS.CLIENT_REPOSITORY,
          useFactory: (datasource: DataSource) => {
            return new ClientTypeOrmRepository(
              datasource.getRepository(ClientSchema),
            );
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

    clientRepository = testModule.get<ClientRepository>(
      PROVIDERS.CLIENT_REPOSITORY,
    );
    typeormRepository = testModule.get<Repository<ClientSchema>>(
      'TYPEORM_CLIENT_REPOSITORY',
    );
    datasource = testModule.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await typeormRepository.clear();
  });

  afterAll(async () => {
    await container.stop();
  });


  it('should be defined', async () => {
    const app = testModule;
    expect(app).toBeDefined();
    expect(clientRepository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });


  it('should insert a client as individual', async () => {
    const clientToSave = IndividualClient.fromJson(clientStub.toIndividualClient('Alice' , 'Doe').build()).toDataModel();
    const clientSaved = await clientRepository.insert(clientToSave);


    const client = await typeormRepository.findOne({
      where: { id: 1 },
    });

    expect(client).toBeDefined();
    expect(client).toEqual(clientSaved);
  });

  it('should save a client as individual', async () => {
    const clientToSave = IndividualClient.fromJson(clientStub.toIndividualClient('Alice' , 'Doe').build()).toDataModel();
    const savedClient = await clientRepository.insert(clientToSave);

    const client = await typeormRepository.findOne({
      where: { id: 1 },
    });

    expect(client).toBeDefined();
    expect(client).toEqual(savedClient);
  });

  it('save method should update existing client', async () => {
    const clientToSave = IndividualClient.fromJson(clientStub.toIndividualClient('Alice' , 'Doe').build()).toDataModel();
    await clientRepository.insert(clientToSave);

    const clientToUpdate = IndividualClient.fromJson(clientStub.toIndividualClient('Alice' , 'Doe').withId(1).build()).toDataModel();
    await clientRepository.save(clientToUpdate);

    const client = await typeormRepository.findOne({
      where: { id: 1 },
    });

    expect(client).toBeDefined();
    expect(client).toEqual(clientToUpdate);
  });



});

//   it('should be defined', async () => {
//     const app = testModule;
//     expect(app).toBeDefined();
//     expect(organizerRepository).toBeDefined();
//     expect(typeormRepository).toBeDefined();
//   });

//   it('should save an organizer', async () => {
//     const organizerToSave = Organizer.fromJson(organizerStub.build());
//     await organizerRepository.save(organizerToSave);

//     const organizer = await typeormRepository.findOne({
//       where: { id: 1 },
//       // relations: ['events'],
//     });

//     // if (organizer.events == undefined) {
//     //   organizer.events = [];
//     // }

//     expect(organizer).toBeDefined();

//     expect(organizer).toEqual(organizerToSave.toDataModel());
//   });

//   // it('should save an organizer with events', async () => {
//   //   const basicInformation = basicInformationBuilder().withId(1).build();

//   //   const organizerToSave = Organizer.fromJson(
//   //     organizerStub
//   //       .withEvents([
//   //         {
//   //           id: 1,
//   //           basicInformations:
//   //             EventBasicInformations.fromJson(basicInformation),
//   //           createdAt: new Date(),
//   //           isPublished: false,
//   //         },
//   //         {
//   //           id: 2,
//   //           basicInformations: EventBasicInformations.fromJson(
//   //             basicInformationBuilder()
//   //               .withId(2)
//   //               .withCity('Casablanca')
//   //               .build(),
//   //           ),
//   //           createdAt: new Date(),
//   //           isPublished: false,
//   //         },
//   //       ])
//   //       .build(),
//   //   );

//   //   await organizerRepository.save(organizerToSave);

//   //   const organizer = await typeormRepository.findOne({
//   //     where: { id: 1 },
//   //     relations: ['events', 'events.basicInformation'],
//   //   });

//   //   expect(organizer).toBeDefined();

//   //   expect(organizer).toEqual(organizerToSave.toDataModel());
//   // });

//   it('should return an organizer by email', async () => {
//     await organizerRepository.save(Organizer.fromJson(organizerStub.build()));

//     const organizer = await organizerRepository.findByEmail(
//       organizerStub.build().email,
//     );

//     expect(organizer).toBeDefined();

//     expect(organizer.toJson()).toEqual(
//       organizerStub.withPassword(organizer.toJson().password).build(),
//     );
//   });

//   it('should return undefined if organizer does not exist', async () => {
//     const organizer = await organizerRepository.findByEmail(
//       organizerStub.build().email,
//     );

//     console.log(organizer);

//     expect(organizer).toBeUndefined();
//   });

//   it('not save save the organizer if the email already exists', async () => {
//     await organizerRepository.save(Organizer.fromJson(organizerStub.build()));

//     try {
//       await organizerRepository.save(
//         Organizer.fromJson(
//           organizerStub.withId(2).withUsername('qlqchose').build(),
//         ),
//       );
//     } catch (error) {
//       thrownError = error;
//     }

//     expect(thrownError).toBeDefined();
//     expect(thrownError.message).toEqual('email already exists');
//   });

//   it('not save save the organizer if the phoneNumber already exists', async () => {
//     await organizerRepository.save(Organizer.fromJson(organizerStub.build()));

//     try {
//       await organizerRepository.save(
//         Organizer.fromJson(
//           organizerStub.withId(2).withEmail('elhilali@gmail.com').build(),
//         ),
//       );
//     } catch (error) {
//       thrownError = error;
//     }

//     expect(thrownError).toBeDefined();
//     expect(thrownError.message).toEqual('phoneNumber already exists');
//   });});});});});
