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

      await this.organizerRepository.insert(organizer.toDataModel());

    } catch (error) {
      const fieldName = this.extractFieldNameFromErrorDetail(error.detail);
      if (fieldName == null) throw error;

      throw new DuplicateFieldError(fieldName);
    }
  }

  async findByEmail(email: string): Promise<Organizer | undefined> {
    const organizer: OrganizerSchema = await this.organizerRepository.findOne({
      where: { email: email },
      relations: ['events' , 'events.basicInformation'],
    });
    if (organizer == undefined) {
      return undefined;
    }
    return Organizer.fromDataModel(organizer);
  }

  async findById(id: number): Promise<Organizer | undefined> {
    const organizer: OrganizerSchema = await this.organizerRepository.findOne({
      where: { id: id },
      relations: ['events' , 'events.basicInformation'],
    });
    if (organizer == undefined) {
      return undefined;
    }
    return Organizer.fromDataModel(organizer);
  }

  async findByUsername(username: string): Promise<Organizer | undefined> {
    const organizer: OrganizerSchema = await this.organizerRepository.findOne({
      where: { username: username },
    });
    if (organizer == undefined) {
      return undefined;
    }
    return Organizer.fromDataModel(organizer);
  }
}
