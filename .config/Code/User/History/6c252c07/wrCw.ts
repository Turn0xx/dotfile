import {
  EventBasicInformation,
  EventPlace,
  EventDate,
  EventBasicInformationsJson,
  EventBasicInformations,
} from '../../domain/basic-information';
import { DateProvider } from '../../domain/date-provider';
import { z } from 'zod';
import { BasicInformationRepository } from '../basic-information.repository';
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

    const basicInfo: EventBasicInformations = EventBasicInformations.fromJson({
      id: command.id,
      basicInfo: command.basicInfo,
      place: command.place,
      date: command.date,
      createdAt: this.dateProvider.getNow(),
    });

    const organizer = await this.organizerRepository.findById(command.organizerId);

    if (organizer === undefined) {
        throw new Error('Organizer not found');
    }

    organizer.initializeEvent(basicInfo);

    
    await this.organizerRepository.save(organizer);
  }
}
