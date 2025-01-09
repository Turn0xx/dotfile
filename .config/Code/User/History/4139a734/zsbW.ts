import { PrismaClient } from "@prisma/client";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

import { exec } from "child_process";
import { promisify } from "util";
import { PrismaMessageRepository } from "../infra/message.prisma.repository";
import { messageBuilder } from "../test/builders/message.builder";
import * as fs from "fs";
import * as path from "path";

const asyncExec = promisify(exec);

const lastEnv = process.env.DATABASE_URL;

const overwritePrismaEnv = async () => {
  
  await fs.promises.writeFile(".env", `DATABASE_URL=${process.env.DATABASE_URL}`);
  

}

const restorePrismaEnv = async (fileContent: string) => {
    
  await fs.promises.writeFile(".env", fileContent);
    
}

const readPrismaEnv = async (): Promise<string> => {
  const fileContent = await fs.promises.readFile(".env", "utf-8");
  return fileContent;
}


describe("PrismaMessageRepository", () => {
  let container: StartedPostgreSqlContainer;
  let prismaClient: PrismaClient;

  let messageRepository: PrismaMessageRepository;
  let envFileContent: string;

  beforeAll(async () => {

    envFileContent = await readPrismaEnv();

    
    container = await new PostgreSqlContainer()
      .withDatabase("crafty-test")
      .withUsername("crafty-test")
      .withPassword("crafty-test")
      .withExposedPorts(5432)
      .start();
      
      const dbUrl = `postgresql://crafty-test:crafty-test@${container.getHost()}:${container.getMappedPort(
        5432
        )}/crafty-test?schema=public`;


        prismaClient = new PrismaClient({
          datasources: {
            db: {
              url: dbUrl,
        },
      },
    });

    process.env.DATABASE_URL = dbUrl;
    
    await overwritePrismaEnv();

    const { stderr, stdout } = await asyncExec(`npx prisma migrate deploy`);

    


    return await prismaClient.$connect();
  }, 30000);

  afterAll(async () => {
    await restorePrismaEnv(envFileContent);
    await container.stop();
    await prismaClient.$disconnect();
  }, 30000);

  beforeEach(async () => {
    await prismaClient.message.deleteMany();
    await prismaClient.user.deleteMany();

    messageRepository = new PrismaMessageRepository(prismaClient);
  }, 30000);

  test("save() should save a message", async () => {
    const message = messageBuilder().randomBuild();

    await messageRepository.save(message);

    const expectedMessage = await prismaClient.message.findUnique({
      where: { id: message.id },
    });

    expect(expectedMessage).toEqual({
      id: message.id,
      text: message.text.getText(),
      authorName: message.author,
      publishedAt: new Date(message.date),
    });
  });
});
