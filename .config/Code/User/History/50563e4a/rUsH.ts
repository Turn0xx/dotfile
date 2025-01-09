export interface OrganizerAggregateRepository {

    save(organizer: Organizer): Promise<void>;

    findById(id: number): Promise<Organizer | undefined>;



}