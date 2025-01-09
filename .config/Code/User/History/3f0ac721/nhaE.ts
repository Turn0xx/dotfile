import { number } from 'zod';
import { OrganizerAggregateRepository } from '../application/aggregate-organizer.repository';
import { BasicInformationRepository } from '../application/basic-information.repository';
import { OrganizerRepository } from '../application/organizer.repository';
import { Organizer } from '../domain/organizer';

export class InMemoryAggregateOrganizerRepository
  implements OrganizerAggregateRepository
{
  constructor(
    private readonly organizerRepository: OrganizerRepository,
    private readonly basicInformationRepository: BasicInformationRepository,
  ) {}

  async save(organizer: Organizer): Promise<void> {
    this.organizerRepository.save(organizer);
    this.basicInformationRepository.save(
      organizer.events.at[-1].basicInformation,
    );
  }

  async findById(id: number): Promise<Organizer | undefined> {
    try {
      const organizer = await this.organizerRepository.findById(id);
      if (!organizer) {
        return undefined;
      }

      return organizer;
    } catch (error) {
      console.log(error);
    }
  }
}
