import { Organizer } from '../domain/organizer';
import { RegistrationCommand } from './usecases/register.usecase';

export interface OrganizerRepository {
  save(organizer: Organizer): Promise<void>;
  findByEmail(email: string): Promise<Organizer | undefined>;
}
