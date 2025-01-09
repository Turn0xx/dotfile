import { Organizer, OrganizerJson } from '../domain/organizer';

export interface OrganizerRepository {
  save(organizer: Organizer): Promise<void>;
  findByEmail(email: string): Promise<Organizer | undefined>;
  findById(id: number): Promise<Organizer | undefined>;
  findByUsername(username: string): Promise<Organizer | undefined>;
}
