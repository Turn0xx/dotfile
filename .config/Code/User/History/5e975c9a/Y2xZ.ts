import { DateProvider } from '../../domain/date-provider';
import { Organizer } from '../../domain/organizer';
import { OrganizerRepository } from '../organizer.repository';
import { z } from 'zod';

const CommandSchema = z
  .object({
    organizationName: z.string().max(64 , { message: 'Organization name must be less than 64 characters' }),
    organizationAddress: z.string().max(255),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string(),
  })
  .readonly();

export type RegistrationCommand = z.infer<typeof CommandSchema>;

export class RegistrationUseCase {
  constructor(
    private dateProvider: DateProvider,
    private organizerRepository: OrganizerRepository,
  ) {
    console.log('RegistrationUseCase');
  }

  async handle(command: RegistrationCommand) {
    const validationResult = CommandSchema.safeParse(command);
    if (!validationResult.success) {
      throw validationResult['error'].issues;
      ;
    }

    const organizer: Organizer = {
      organizationName: command.organizationName,
      email: command.email,
      password: command.password,
      createdAt: this.dateProvider.getNow(),
    };

    await this.organizerRepository.save(organizer);
  }
}
