import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema } from './pocket-ticket/client/infrastructure/organizer.schema';
import { BasicInformationSchema } from './pocket-ticket/client/infrastructure/basic-information.schema';
import { EventSchema } from './pocket-ticket/client/infrastructure/event.schema';

export const dataBaseConfigModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  database: 'pocket_ticket',
  username: 'postgres',
  password: 'pocket',
  entities: [EventSchema , OrganizerSchema , BasicInformationSchema , ],
  synchronize: true,
});