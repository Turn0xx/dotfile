import { Organizer, OrganizerJson } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: Organizer): Promise<void>;
  findByEmail(email: string): Promise<OrganizerJson | undefined>;
}
