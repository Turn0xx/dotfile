import { Organizer, OrganizerJSON } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: OrganizerJSON): Promise<void>;
  findById(id: number): Promise<Organizer | undefined>;
  findByEmail(email: string): Promise<Organizer | undefined>;
}
