import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { IdentityModule } from "../../identity/identity.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    IdentityModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret', //TODO: move to env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    LocalAuthGuard,
    AuthService,
  ],
  exports: [],
})
export class AuthModule {}