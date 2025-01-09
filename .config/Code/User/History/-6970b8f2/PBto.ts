import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DatabaseContainer, DbConfig } from './container';

export class pgContainer implements DatabaseContainer {
  private container: StartedPostgreSqlContainer

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

  async startContainer() {
    // Start the container
  }

  async stopContainer() {
    // Stop the container
  }
}
