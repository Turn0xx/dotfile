import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const dataBaseConfigModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  database: 'pocket_ticket',
  username: 'postgres',
  password: 'pocket',
  entities: [],
  synchronize: true,
});