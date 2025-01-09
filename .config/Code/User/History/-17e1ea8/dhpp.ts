import { OrganizerJSON } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: OrganizerJSON): Promise<void>;
  findByEmail(email: string): Promise<OrganizerJSON | undefined>;
}
