import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DatabaseContainer, DbConfig } from './container';

export class PgContainer implements DatabaseContainer {
  private container: StartedPostgreSqlContainer;

  private internalConfig = {
    database: 'pocket-ticket',
    username: 'postgres',
    password: 'pocket',
    port: 5432,
  };

  async configureDatabase(dbConfig: DbConfig) {
    if (dbConfig.internal) {
      this.internalConfig = dbConfig.config;
    }
  }

  async start() {
    this.container = await new PostgreSqlContainer()
      .withUsername(this.internalConfig.username)
      .withDatabase(this.internalConfig.database)
      .withPassword(this.internalConfig.password)
      .withExposedPorts(this.internalConfig.port)
      .start();
  }

  async stopContainer() {
    this.container.stop();
  }

  getPort() : number {
    return this.container.getMappedPort(this.internalConfig.port);
  }
}
