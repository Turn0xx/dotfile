import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DbConfig } from "./container"
import { EntitySchema } from "typeorm"

type NewType = List<EntitySchema>

export const TypeOrmConfig = (dbConfig: DbConfig , entities: NewType): DynamicModule => {
  return TypeOrmModule.forRoot({

  })
} any