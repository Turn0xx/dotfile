import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DbConfig } from "./container"
import { EntitySchema } from "typeorm"

export const TypeOrmConfig = (dbConfig: DbConfig , entities: List<EntitySchema<>>): DynamicModule => {
  return TypeOrmModule.forRoot({

  })
} 