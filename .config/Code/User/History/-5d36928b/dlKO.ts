import { CanActivate } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Strategy } from "passport-local";

export class GoogleAuthGuard extends AuthGuard('google') {}