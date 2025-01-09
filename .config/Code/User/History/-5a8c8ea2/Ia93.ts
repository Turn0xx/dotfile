import { OrganizerRepository } from "../application/organizer.repository";
import { RegistrationCommand } from "../application/usecases/register.usecase";
import { Organizer } from "../domain/organizer";

export class InMemoryOrganizerRepository implements OrganizerRepository {
    private organizers: Organizer[] = [];

    constructor() {
        console.log('InMemoryOrganizerRepository');
    }

    async save(organizer: Organizer) {
        this.organizers.push(organizer);
    }

    async findByEmail(email: string): Promise<Organizer | undefined> {
        return this.organizers.find(organizer => organizer.email === email);
    }
}