import { Organizer } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: Organizer): Promise<void>;
  findById(id: number): Promise<Organizer | undefined>;
  findByEmail(email: string): Promise<Organizer | undefined>;
}
