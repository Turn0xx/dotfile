import { DataSource, Repository } from 'typeorm';
import { OrganizerRepository } from '../application/organizer.repository';
import { Organizer, OrganizerJSON } from '../domain/organizer';
import { OrganizerSchema } from './organizer.schema';
import { unknown } from 'zod';
import { DuplicateFieldError } from '../errors/duplicateField.error';

export class OrganizerTypeOrmRepository implements OrganizerRepository {
  constructor(
    private readonly organizerRepository: Repository<OrganizerSchema>,
    private readonly dataSource: DataSource
  ) {}

  extractFieldNameFromErrorDetail(errorDetail: string): string | null {
    const regex = /Key \("?(\w+)"?\)=/;
    const fieldName = regex.exec(errorDetail);
    return fieldName ? fieldName[1] : null;
  }

  async save(organizer: Organizer): Promise<void> {
    try {
      await this.organizerRepository.save(organizer);
    } catch (error) {
      const fieldName = this.extractFieldNameFromErrorDetail(error.detail);
      if (fieldName == null) throw new Error('unknown saving error');
      
      throw new DuplicateFieldError(fieldName);
      
    }
  }

  async findByEmail(email: string): Promise<Organizer | undefined> {
    const organizer: OrganizerSchema = await this.organizerRepository.findOne({
      where: { email: email },
    });
    if (organizer == undefined) {
      return undefined;
    }

    return Organizer.ofJson({...organizer, events: []});
  }

  async findById(id: number): Promise<Organizer | undefined> {
    const organizer: OrganizerSchema = await this.organizerRepository.findOne({
      where: { id: id },
    });
    if (organizer == undefined) {
      return undefined;
    }

    return Organizer.ofJson({...organizer, events: []});
  }

  async update(organizer: Organizer): Promise<void> {
    await this.organizerRepository.update(organizer.id, organizer);
  }
}
