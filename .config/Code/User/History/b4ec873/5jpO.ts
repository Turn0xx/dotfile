import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

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
    {
      provide
    }

  ],
  exports: [],
})
export class AuthModule {}