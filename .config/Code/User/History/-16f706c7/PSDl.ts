import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DbConfig } from "./container"
import { EntitySchema } from "typeorm"

export const TypeOrmConfig = (dbConfig: DbConfig , entities: EntitySchema<any>[]): DynamicModule => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    database: dbConfig.config.database,
    username: dbConfig.config.username,
    password: dbConfig.config.password,
    port: dbConfig.mappedPort,
    entities: entities,
    synchronize: true,
  })
} 