import { OrganizerRepository } from "../application/organizer.repository";

export class InMemoryAggregateOrganizerRepository {
    constructor(
        private readonly organizerRepository: OrganizerRepository,
        private readonly basicInformationRepository: BasicInf,
    ) 
    {
        
    }
}