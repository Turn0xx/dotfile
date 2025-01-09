import {
  ValidateBasicInformationCommand,
  ValidateBasicInformationUseCase,
} from 'src/pocket-ticket/client/application/usecases/validate-basic-information.usecase';
import { Organizer, OrganizerJson } from 'src/pocket-ticket/client/domain/organizer';
import { InMemoryBasicInformationRepository } from 'src/pocket-ticket/client/test/basic-information.in-memory';
import {
  BasicInformationBuilder,
  basicInformationBuilder,
} from 'src/pocket-ticket/client/test/builders/basic-information.command.builder';
import { organizerBuilder } from 'src/pocket-ticket/client/test/organizer.builder';
import {
  InMemoryOrganizerRepository,
  StubDateProvider,
} from 'src/pocket-ticket/client/test/organizer.in-memory';

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

    it('Alice wants to create an event and validate the basic information with invalid data and fail', async () => {
      fixture.givenNowIs(new Date(2021, 1, 1));
      await fixture.givenExistingOrganizers(aliceOrganizer);

      const newBasicInformation = basicInformationBuild.withEventName('zabi')

      await fixture.whenUserValidatesBasicInformation(newBasicInformation.build());

      await fixture.thenErrorShouldBe(Error);

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
    givenExistingOrganizers: async (organizers: OrganizerJson) => {
      await organizerRepository.save(Organizer.fromJson(organizers));
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

    thenInformationsShouldBeSaved: async (builder: BasicInformationBuilder) => {
      expect(thrownError).toBeUndefined();

      const basicInformation = await basicInformationRepository.getById(1);

      const basicInfo = builder.build();

      expect(basicInformation).toEqual({
        ...basicInfo,
        createdAt: dateProvider.getNow(),
      });
    },

    thenErrorShouldBe(expectedThrownError: new (...args) => Error) {
      expect(thrownError.name).toBe(expectedThrownError.name);
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
