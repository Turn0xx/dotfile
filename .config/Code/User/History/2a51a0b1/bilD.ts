import exp from 'constants';
import {
  ValidateBasicInformationCommand,
  ValidateBasicInformationUseCase,
} from 'src/pocket-ticket/client/application/usecases/validate-basic-information.usecase';
import {
  BasicInformations,
  EventBasicInformation,
  EventDate,
  EventPlace,
} from 'src/pocket-ticket/client/domain/basic-information';
import { Organizer } from 'src/pocket-ticket/client/domain/organizer';
import { InMemoryBasicInformationRepository } from 'src/pocket-ticket/client/test/basic-information.in-memory';
import { organizerBuilder } from 'src/pocket-ticket/client/test/organizer.builder';
import {
  InMemoryOrganizerRepository,
  StubDateProvider,
} from 'src/pocket-ticket/client/test/organizer.in-memory';

const basicInformationBuilder = ({
  id = 1,
  organizerId = 1,
  basicInfo = {
    eventName: 'Event Name',
    eventTypes: ['Event Type 1', 'Event Type 2'],
    eventCategory: 'Event Category',
    tags: ['Tag 1', 'Tag 2'],
  },

  place = {
    isOnline: true,
    address: '8 Rue Jean Heanri Schnitzler, France',
    address2: '',
    city: 'Paris',
    region: 'Ile de France',
    zipCode: '75001',
    country: 'France',
  },

  date = {
    startDate: new Date(2021, 1, 1, 10, 30, 0),
    endDate: new Date(2021, 1, 1, 18, 45, 0),
    timeZone: 'Europe/Paris',
  },
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
}: Partial<BasicInformations> = {}) => {
  const props = {
    id,
    organizerId,
    basicInfo,
    place,
    date,
    createdAt,
  };

  return {
    withId: (id: number) => basicInformationBuilder({ ...props, id }),
    withOrganizerId: (organizerId: number) =>
      basicInformationBuilder({ ...props, organizerId }),
    withBasicInfo: (basicInfo: EventBasicInformation) =>
      basicInformationBuilder({ ...props, basicInfo }),
    withPlace: (place: EventPlace) =>
      basicInformationBuilder({ ...props, place }),
    withDate: (date: EventDate) => basicInformationBuilder({ ...props, date }),
    withCreatedAt: (createdAt: Date) =>
      basicInformationBuilder({ ...props, createdAt }),
    build: () => props,
  };
};

type BuilderType = ReturnType<typeof basicInformationBuilder>;

describe('Feature : User creates an event and validate the basic information step', () => {
  describe('Scenario: User validate basic information step', () => {
    let fixture: Fixture;

    let organizerBuild = organizerBuilder();
    let aliceOrganizer = organizerBuild.build();
    let basicInformationBuild = basicInformationBuilder();

    let basicInformations = basicInformationBuild.build();

    beforeEach(async () => {
      fixture = createFixture();
    });

    it('Alice wants to create an event and validate the basic information step', async () => {
      fixture.givenNowIs(new Date(2021, 1, 1));
      await fixture.givenExistingOrganizers(aliceOrganizer);

      await fixture.whenUserValidatesBasicInformation(basicInformations);

      await fixture.thenInformationsShouldBeSaved(basicInformationBuild);
    });
  });
});

const createFixture = () => {
  let thrownError: Error;

  const dateProvider = new StubDateProvider();
  const organizerRepository = new InMemoryOrganizerRepository();
  const basicInformationRepository = new InMemoryBasicInformationRepository();

  const validateBasicInformationUseCase = new ValidateBasicInformationUseCase(
    dateProvider,
    basicInformationRepository,
  );

  return {
    givenExistingOrganizers: async (organizers: Organizer) => {
      await organizerRepository.save(organizers);
    },

    givenNowIs: (now: Date) => {
      dateProvider.now = now;
    },

    whenUserValidatesBasicInformation: async (
      command: ValidateBasicInformationCommand,
    ) => {
      try {
        await validateBasicInformationUseCase.handle(command);
      } catch (error) {
        thrownError = error;
      }
    },

    thenInformationsShouldBeSaved: async (builder: BuilderType) => {
      expect(thrownError).toBeUndefined();

      const basicInformation = await basicInformationRepository.getById(1);

      const basicInfo = builder.build();

      expect(basicInformation).toEqual({
        basicInfo,
      });
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
