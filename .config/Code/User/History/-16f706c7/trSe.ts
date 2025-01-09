import { DynamicModule } from "@nestjs/common"

export const TypeOrmConfig (): DynamicModule => {
  return TypeOrmModule.forRoot({})

} 