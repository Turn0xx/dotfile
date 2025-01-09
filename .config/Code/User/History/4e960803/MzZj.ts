export const dataBaseConfigModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [],
    synchronize: true,
    });