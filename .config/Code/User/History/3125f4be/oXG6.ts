import { INestApplication } from "@nestjs/common";
import { request } from "express";
import { Repository } from "typeorm";
import { RegistrationCommand } from "../../../../src/pocket-ticket/client/identity/application/commands/registration.command";
import { ClientSchema } from "../../../../src/pocket-ticket/infrastructure/client.schema";
import { TokenSchema } from "../../../../src/pocket-ticket/notification-services/infrastructure/tokens.schema";

export const createRegistrationFixture = (props: {
  app: INestApplication;
  clientRepository: Repository<ClientSchema>;
  tokenRepository: Repository<TokenSchema>;
}) => {
  const { app, clientRepository, tokenRepository } = props;
  let token = undefined;

  const givenRegistredClient = async (payload: ClientSchema[]) => {
    await clientRepository.save(payload);
  };

  const registerClient = async (payload: RegistrationCommand) => {
    const req = await request(app.getHttpServer())
      .post('/registration')
      .send(payload);
    return req;
  };

  const loginClient = async (payload: {
    username: string;
    password: string;
  }) => {
    const req = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    token = req.body.access_token;

    return req;
  };

  const validateEmail = async (payload: string) => {
    const req = await request(app.getHttpServer())
      .get(`/identity/validate-me?token=${payload}`)
      .set('Authorization', `Bearer ${token}`);
    return req;
  };

  return {
    registerClient,
    givenRegistredClient,
    loginClient,
    validateEmail,
  };
};

export type RegistrationFixture = ReturnType<typeof createRegistrationFixture>;