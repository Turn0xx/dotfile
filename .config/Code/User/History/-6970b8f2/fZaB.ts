import { DatabaseContainer, DbConfig } from "./container";




export class pgContainer implements DatabaseContainer {

  private internalConfig = {

  }

  async configureDatabase(dbConfig: DbConfig) {
    
  }

  async startContainer() {
    // Start the container
  }

  async stopContainer() {
    // Stop the container
  }
}