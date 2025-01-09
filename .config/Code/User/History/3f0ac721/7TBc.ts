export class InMemoryAggregateOrganizerRepository {
    constructor(
        private readonly organizerRepository: Orga,
        private readonly basicInformationRepository: any,
    ) 
    {
        
    }
}