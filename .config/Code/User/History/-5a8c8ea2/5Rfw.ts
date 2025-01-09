import { OrganizerRepository } from "../application/organizer.repository";
import { RegistrationCommand } from "../application/usecases/register.usecase";

export class InMemoryOrganizerRepository implements OrganizerRepository {
    private organizers: Organizer[] = [];

    async save(organizer: RegistrationCommand) {
        this.organizers.push(organizer);
    }

    async findByEmail(email: string): Promise<Organizer | undefined> {
        return this.organizers.find(organizer => organizer.email === email);
    }
}