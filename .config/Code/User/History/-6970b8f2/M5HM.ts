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

  private dbConfig: DbConfig = {
    internal: true,
    config: this.internalConfig,
  };



  async configureDatabase(dbConfig: DbConfig) {
    if (dbConfig.internal) {
      this.internalConfig = dbConfig.config;
    }

    this.dbConfig = dbConfig;
  }

  async start() {
    this.container = await new PostgreSqlContainer()
      .withUsername(this.internalConfig.username)
      .withDatabase(this.internalConfig.database)
      .withPassword(this.internalConfig.password)
      .withExposedPorts(this.internalConfig.port)
      .start();

    this.dbConfig.mappedPort = this.container.getMappedPort(this.internalConfig.port);
    this.dbConfig.host = this.container.getHost();

  }

  async stop() {
    this.container.stop();
  }

  getPort() : number {
    return this.container.getMappedPort(this.internalConfig.port);
  }

  getConfig() : DbConfig {
    return this.dbConfig;
  }
}
