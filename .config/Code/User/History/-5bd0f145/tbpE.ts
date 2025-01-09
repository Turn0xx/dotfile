import { Repository } from 'typeorm';
import { OrganizerRepository } from '../application/organizer.repository';
import { OrganizerJson } from '../domain/organizer';
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

  async save(organizer: Org): Promise<void> {
    try {
      await this.organizerRepository.save(organizer);
    } catch (error) {
      const fieldName = this.extractFieldNameFromErrorDetail(error.detail);
      if (fieldName == null) throw new Error('unknown saving error');

      throw new DuplicateFieldError(fieldName);
    }
  }

  async findByEmail(email: string): Promise<OrganizerJson | undefined> {
    const organizer: OrganizerSchema = await this.organizerRepository.findOne({
      where: { email: email },
    });
    if (organizer == undefined) {
      return undefined;
    }
    return organizer;
  }
}
