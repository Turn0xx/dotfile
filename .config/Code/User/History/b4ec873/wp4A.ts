import { Module } from "@nestjs/common";

@Module({
  imports: [
    
    JwtModule.register({
      global: true,
      secret: 'secret', //TODO: move to env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [

  ],
  exports: [],
})
export class AuthModule {}