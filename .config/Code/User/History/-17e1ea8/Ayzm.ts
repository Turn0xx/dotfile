import { Organizer } from "../domain/organizer";
import { RegistrationCommand } from "./usecases/register.usecase";

export interface OrganizerRepository {
    save(organizer: RegistrationCommand): Promise<void>;
    findByEmail(email: string): Promise<Organizer | undefined>;
}