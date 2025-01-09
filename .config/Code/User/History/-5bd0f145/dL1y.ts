import { Repository } from 'typeorm';
import { OrganizerRepository } from '../application/organizer.repository';
import { Organizer, OrganizerJson } from '../domain/organizer';
import { OrganizerSchema } from './organizer.schema';
import { unknown } from 'zod';
import { DuplicateFieldError } from '../errors/duplicateField.error';

export class OrganizerTypeOrmRepository implements OrganizerRepository {
  constructor(
    private readonly organizerRepository: Repository<OrganizerSchema>,
  ) {}

  extractFieldNameFromErrorDetail(errorDetail: string): string | null {
    const regex = /Key \("?(\w+)"?\)=/;
    const fieldName = regex.exec(errorDetail);
    return fieldName ? fieldName[1] : null;
  }

  async save(organizer: Organizer): Promise<void> {
    try {
      await this.organizerRepository.save(organizer.toDataModel());
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
    return Organizer.fromDataModel(organizer);
  }
}
