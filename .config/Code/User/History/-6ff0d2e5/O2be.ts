import { Inject } from '@nestjs/common';
import {
  AccountTypeEnum,
  ClientSchema,
} from '../../../infrastructure/client.schema';
import { Repository } from 'typeorm';
import { ClientRepository } from '../application/repositories/client.repository';
import { Client } from '../domain/client';
import { CompanyClient } from '../domain/company-client';
import { IndividualClient } from '../domain/individual-client';

export class ClientTypeOrmRepository implements ClientRepository {
  constructor(
    private readonly clientRepository: Repository<ClientSchema>,
  ) {
  }

  async insert(client: ClientSchema): Promise<ClientSchema> {
    try {
      // insert method does not return the inserted entity and it's problematic
      // const retClient = await this.clientRepository.insert(client);
      const retClient = await this.clientRepository.save(client);

      return retClient;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(client: ClientSchema): Promise<ClientSchema> {
    try {
      return await this.clientRepository.save(client);
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

      const all = await this.clientRepository.find();


      const client = await this.clientRepository.findOne({ where: { email } });

      if (!client) {
        return undefined;
      }

      return client.accountType === AccountTypeEnum.INDIVIDUAL
        ? IndividualClient.fromDataModel(client)
        : CompanyClient.fromDataModel(client);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyClient(id: number): Promise<void> {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new Error('Client not found');
      }

      client.isVerified = true;
      await this.clientRepository.save(client);
    } catch (error) {
      throw new Error(error);
    }
  }
}
