import { OrganizerJson } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: OrganizerJson): Promise<void>;
  findByEmail(email: string): Promise<OrganizerJson | undefined>;
}
