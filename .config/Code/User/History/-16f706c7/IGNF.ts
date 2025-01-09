import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DbConfig } from "./container"

export const TypeOrmConfig = (dbConfig: DbConfig , ): DynamicModule => {
  return TypeOrmModule.forRoot({

  })
} 