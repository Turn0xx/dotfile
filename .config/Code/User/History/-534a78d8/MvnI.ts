import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { OrganizerSchema } from 'src/pocket-ticket/client/infrastructure/organizer.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizerRepository } from 'src/pocket-ticket/client/application/organizer.repository';
import { OrganizerTypeOrmRepository } from 'src/pocket-ticket/client/infrastructure/organizer.typeorm';
import { DataSource, Repository } from 'typeorm';
import { organizerBuilder } from 'src/pocket-ticket/client/test/organizer.builder';
import { Organizer } from 'src/pocket-ticket/client/domain/organizer';
import { BasicInformationSchema } from 'src/pocket-ticket/client/infrastructure/basic-information.schema';
import { EventSchema } from 'src/pocket-ticket/client/infrastructure/event.schema';

const dataBaseTestConfig = {
  database: 'pocket-ticket',
  username: 'postgres',
  password: 'pocket',
  port: 5432,
};

describe('OrganizerRepo', () => {
  let container: StartedPostgreSqlContainer;
  let testModule: TestingModule;
  let organizerRepository: OrganizerRepository;
  let typeormRepository: Repository<OrganizerSchema>;

  let thrownError: Error;

  let organizerStub = organizerBuilder().withCreatedAt(new Date());

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
          entities: [OrganizerSchema, EventSchema, BasicInformationSchema],
          synchronize: true,
        }),
      ],

      providers: [
        {
          provide: 'TYPEORM_ORGANIZER_REPOSITORY',
          useFactory: (datasource: DataSource) => {
            return datasource.getRepository(OrganizerSchema);
          },
          inject: [DataSource],
        },
        {
          provide: 'ORGANIZER_REPOSITORY',
          useFactory: (datasource: DataSource) => {
            return new OrganizerTypeOrmRepository(
              datasource.getRepository(OrganizerSchema),
            );
          },
          inject: [DataSource],
        },
      ],
    }).compile();

    organizerRepository = testModule.get<OrganizerRepository>(
      'ORGANIZER_REPOSITORY',
    );

    typeormRepository = testModule.get<Repository<OrganizerSchema>>(
      'TYPEORM_ORGANIZER_REPOSITORY',
    );

    datasource = testModule.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await datasource.query('DELETE FROM event_schema');
    await datasource.query('DELETE FROM organizer_schema');
    await datasource.query('DELETE FROM basic_information_schema');
  });

  afterAll(async () => {
    await container.stop();
  });

  it('should be defined', async () => {
    const app = testModule;
    expect(app).toBeDefined();
    expect(organizerRepository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });

  it('should save an organizer', async () => {
    const organizerToSave = Organizer.fromJson(organizerStub.build());
    await organizerRepository.save(organizerToSave);

    const organizer = await typeormRepository.findOne({
      where: { id: 1 },
      relations: ['events'],
    });

    // if (organizer.events == undefined) {
    //   organizer.events = [];
    // }

    expect(organizer).toBeDefined();

    expect(organizer).toEqual(organizerToSave.toDataModel());
  });


  it('should save an organizer with events', async () => {
    

    const organizerToSave = Organizer.fromJson(organizerStub.withEvents(
      
    ).build());
    organizerToSave.addEvent({
      id: 1,
      eventName: 'event1',
      eventDescription: 'event1Description',
      eventDate: new Date(),
      eventLocation: 'event1Location',
      eventPrice: 10,
      eventTotalTickets: 100,
      eventRemainingTickets: 100,
      eventStatus: 'draft',
      eventOrganizerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await organizerRepository.save(organizerToSave);

    const organizer = await typeormRepository.findOne({
      where: { id: 1 },
      relations: ['events'],
    });

    // if (organizer.events == undefined) {
    //   organizer.events = [];
    // }

    expect(organizer).toBeDefined();

    expect(organizer).toEqual(organizerToSave.toDataModel());


  });

  it('should return an organizer by email', async () => {
    await organizerRepository.save(Organizer.fromJson(organizerStub.build()));

    const organizer = await organizerRepository.findByEmail(
      organizerStub.build().email,
    );

    expect(organizer).toBeDefined();

    expect(organizer).toEqual(
      organizerStub.withPassword(organizer.toJson().password).build(),
    );
  });

  it('should return undefined if organizer does not exist', async () => {
    const organizer = await organizerRepository.findByEmail(
      organizerStub.build().email,
    );

    console.log(organizer);

    expect(organizer).toBeUndefined();
  });

  it('not save save the organizer if the email already exists', async () => {
    await organizerRepository.save(Organizer.fromJson(organizerStub.build()));

    try {
      await organizerRepository.save(
        Organizer.fromJson(
          organizerStub.withId(2).withUsername('qlqchose').build(),
        ),
      );
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual('email already exists');
  });

  it('not save save the organizer if the phoneNumber already exists', async () => {
    await organizerRepository.save(Organizer.fromJson(organizerStub.build()));

    try {
      await organizerRepository.save(
        Organizer.fromJson(
          organizerStub.withId(2).withEmail('elhilali@gmail.com').build(),
        ),
      );
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual('phoneNumber already exists');
  });
});
