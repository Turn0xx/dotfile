import { Inject } from '@nestjs/common';
import {
  AccountTypeEnum,
  ClientSchema,
} from 'src/pocket-ticket/infrastructure/client.schema';
import { Repository } from 'typeorm';
import { ClientRepository } from '../application/client.repository';
import { Client } from '../domain/client';
import { CompanyClient } from '../domain/company-client';
import { IndividualClient } from '../domain/individual-client';

export class ClientTypeOrmRepository implements ClientRepository {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: Repository<ClientSchema>,
  ) {}

  async insert(client: ClientSchema): Promise<ClientSchema> {
    try {
      const retClient = await this.clientRepository.insert(client);
      const retClient2 = await this.clientRepository.save(client);

      return retClient.generatedMaps as unknown as ClientSchema;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(client: Client): Promise<void> {
    try {
      await this.clientRepository.save(client.toDataModel());
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new Error('Client not found');
      }

      return client.accountType === AccountTypeEnum.INDIVIDUAL
        ? IndividualClient.fromDataModel(client)
        : CompanyClient.fromDataModel(client);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({ where: { email } });

      if (!client) {
        throw new Error('Client not found');
      }

      return client.accountType === AccountTypeEnum.INDIVIDUAL
        ? IndividualClient.fromDataModel(client)
        : CompanyClient.fromDataModel(client);
    } catch (error) {
      throw new Error(error);
    }
  }
}
