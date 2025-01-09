import { TypeOrmModule } from '@nestjs/typeorm';

export const dataBaseConfigModule: Dy = TypeOrmModule.forRoot({
  type: 'postgres',
  database: 'db',
  entities: [],
  synchronize: true,
});
