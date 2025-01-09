import { OrganizerAggregateRepository } from '../application/aggregate-organizer.repository';
import { BasicInformationRepository } from '../application/basic-information.repository';
import { OrganizerRepository } from '../application/organizer.repository';
import { Organizer } from '../domain/organizer';

export class InMemoryAggregateOrganizerRepository implements OrganizerAggregateRepository{
  constructor(
    private readonly organizerRepository: OrganizerRepository,
    private readonly basicInformationRepository: BasicInformationRepository,
  ) {}

  async save(): Promise<void> {
    this.organizerRepository.save();
  }

  async findById(): Promise<Organizer | undefined> {
    throw new Error('Method not implemented.');
  }

}
