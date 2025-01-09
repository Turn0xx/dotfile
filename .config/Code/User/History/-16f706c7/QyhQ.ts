import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DbConfig } from "./container"
import { EntitySchema } from "typeorm"
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type"

export const TestContainerTypeOrmConfig = (dbConfig: DbConfig , entities: EntityClassOrSchema[]): DynamicModule => {
  

  const dyn = TypeOrmModule.forRoot({
    type: 'postgres',
    database: dbConfig.config.database,
    username: dbConfig.config.username,
    password: dbConfig.config.password,
    port: dbConfig.mappedPort,
    host: dbConfig.host,
    entities: entities,
    synchronize: true,
  })

  console.log(dyn)

  return dyn
} 