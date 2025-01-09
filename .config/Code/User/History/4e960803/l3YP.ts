import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema } from './pocket-ticket/client/authentification/infrastructure/organizer.schema';
import { BasicInformationSchema } from './pocket-ticket/client/authentification/infrastructure/basic-information.schema--';

export const dataBaseConfigModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  database: 'pocket_ticket',
  username: 'postgres',
  password: 'pocket',
  entities: [OrganizerSchema ,  BasicInformationSchema],
  synchronize: true,
});