import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSchema } from './pocket-ticket/infrastructure/client.schema';
import { TokenSchema } from './pocket-ticket/emails/infrastructure/tokens.schema';

export const dataBaseConfigModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  database: 'pocket_ticket',
  username: 'postgres',
  password: 'pocket',
  entities: [ClientSchema , TokenSchema],
  synchronize: true,
});