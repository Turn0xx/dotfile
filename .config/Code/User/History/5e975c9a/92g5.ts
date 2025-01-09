import { DateProvider } from '../../domain/date-provider';
import { Organizer, OrganizerJson } from '../../domain/organizer';
import { OrganizerRepository } from '../organizer.repository';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';


const CommandSchema = z
  .object({
    id: z.number().int().positive(),
    organizationName: z.string().max(64).min(5),
    organizationAddress: z.string().max(255).min(5),
    username: z.string().max(64).min(5),
    email: z.string().email({ message: 'Invalid email' }),
    phoneNumber: z.string().min(10).max(14),
    password: z.string(),
  })
  .readonly();

export type RegistrationCommand = z.infer<typeof CommandSchema>;

export class RegistrationUseCase {
  constructor(
    private dateProvider: DateProvider,
    private organizerRepository: OrganizerRepository,
  ) {
  }

  async handle(command: RegistrationCommand) {
    const validationResult = CommandSchema.safeParse(command);
    if (!validationResult.success) {
      throw validationResult['error'].issues;
      ;
    }


    const salt = await bcrypt.genSalt();    
    const hashedPassword = await bcrypt.hash(command.password, salt);

    const organizer: OrganizerJson = {
      id: command.id,
      organizationName: command.organizationName,
      email: command.email,
      username: command.username,
      organizationAddress: command.organizationAddress,
      phoneNumber: command.phoneNumber,
      password: hashedPassword,
      createdAt: this.dateProvider.getNow(),
      events: [],
    };

    try {
      await this.organizerRepository.save(Organizer.fromJson(organizer));
    } catch (error) {
      throw error;
    }    

  }
}
