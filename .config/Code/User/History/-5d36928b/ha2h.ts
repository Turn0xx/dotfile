import { CanActivate } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class GoogleAuthGuard extends AuthGuard{}