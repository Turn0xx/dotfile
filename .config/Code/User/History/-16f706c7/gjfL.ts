import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

export const TypeOrmConfig = (): DynamicModule => {
  return TypeOrmModule.forRoot({
    
  })
} 