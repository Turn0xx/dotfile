import { Inject } from '@nestjs/common';
import { AccountTypeEnum, ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Repository } from 'typeorm';
import { ClientRepository } from '../application/client.repository';
import { Client } from '../domain/client';

export class ClientTypeOrmRepository implements ClientRepository {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: Repository<ClientSchema>,
  ) {}

  async insert(client: Client): Promise<void> {
    try {
      await this.clientRepository.insert(client.toDataModel());
    } catch (error) {
      throw new Error(error);
    }
  }

  save(client: Client): Promise<void> {
    try {
      this.clientRepository.save(client.toDataModel());
    } catch (error) {
      throw new Error(error);
    }
  }

  findById(id: number): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new Error('Client not found');
      }

      client.accountType === AccountTypeEnum.INDIVIDUAL ? IndividualClient.fromDataModel(client) : CompanyClient.fromDataModel(client);

    } catch (error) {
      throw new Error(error);
    }
  }
  findByEmail(email: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }
}
