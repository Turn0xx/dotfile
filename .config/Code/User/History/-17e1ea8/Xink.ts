import { Organizer, OrganizerJSON } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: OrganizerJSON): Promise<void>;
  findByEmail(email: string): Promise<Organizer | undefined>;
}
