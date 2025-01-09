export interface OrganizerRepository {
    save(organizer: Registion): Promise<void>;
    findByEmail(email: string): Promise<Organizer | undefined>;
}