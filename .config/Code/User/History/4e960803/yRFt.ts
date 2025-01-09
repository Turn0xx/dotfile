import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema } from './pocket-ticket/client/infrastructure/organizer.schema';

export const dataBaseConfigModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  database: 'pocket_ticket',
  username: 'postgres',
  password: 'pocket',
  entities: [OrganizerSchema],
  synchronize: true,
});
 c