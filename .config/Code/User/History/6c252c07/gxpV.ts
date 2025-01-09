import {
  EventBasicInformation,
  EventPlace,
  EventDate,
  BasicInformations,
} from '../../domain/basic-information';
import { DateProvider } from '../../domain/date-provider';
import { z } from 'zod';
import { OrganizerRepository } from '../organizer.repository';
import { Organizer } from '../../domain/organizer';

const CommandSchema = z.object({
  id: z.number(),
  organizerId: z.number(),
  basicInfo: z.object({
    eventName: z.string().min(10),
    eventTypes: z.array(z.string()),
    eventCategory: z.string(),
    tags: z.array(z.string()),
  }),
  place: z.object({
    isOnline: z.boolean(),
    address: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }),
  date: z.object({
    startDate: z.date(),
    endDate: z.date(),
    timeZone: z.string(),
  }),
});

export type ValidateBasicInformationCommand = {
  id: number;
  organizerId: number;
  basicInfo: EventBasicInformation;
  place: EventPlace;
  date: EventDate;
};

export class ValidateBasicInformationUseCase {
  constructor(
    private readonly dateProvider: DateProvider,
    private readonly organizerRepository: OrganizerRepository,
  ) {}

  async handle(command: ValidateBasicInformationCommand) {

    try {
      CommandSchema.parse(command);
    } catch (error) {
        throw new Error('Invalid command');
    }

    const organizer: Organizer = await this.organizerRepository.findById(
      command.organizerId,
    );

    console.log(organizer);

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const basicInformation: BasicInformations = {
      ...command,
      createdAt: this.dateProvider.getNow(),
    };
    

    organizer.initializeBasicInformation(basicInformation);

    try {
      await this.organizerRepository.save(organizer);
    } catch (error) {
      throw error;
    }
  }
}
