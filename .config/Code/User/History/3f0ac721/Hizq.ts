import { OrganizerAggregateRepository } from '../application/aggregate-organizer.repository';
import { BasicInformationRepository } from '../application/basic-information.repository';
import { OrganizerRepository } from '../application/organizer.repository';

export class InMemoryAggregateOrganizerRepository implements OrganizerAggregateRepository{
  constructor(
    private readonly organizerRepository: OrganizerRepository,
    private readonly basicInformationRepository: BasicInformationRepository,
  ) {}


}
