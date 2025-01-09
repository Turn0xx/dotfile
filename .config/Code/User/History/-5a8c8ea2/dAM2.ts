import { OrganizerRepository } from "../application/organizer.repository";

export class InMemoryOrganizerRepository implements OrganizerRepository {
    private organizers: Organizer[] = [];

    async save(organizer: Regis) {
        this.organizers.push(organizer);
    }

    async findByEmail(email: string): Promise<Organizer | undefined> {
        return this.organizers.find(organizer => organizer.email === email);
    }
}