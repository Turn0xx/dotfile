import { DatabaseContainer, DbConfig } from "./container";




export class pgContainer implements DatabaseContainer {
  async configureDatabase(dbConfig: DbConfig) {
    // Configure the database
  }

  async startContainer() {
    // Start the container
  }

  async stopContainer() {
    // Stop the container
  }
}