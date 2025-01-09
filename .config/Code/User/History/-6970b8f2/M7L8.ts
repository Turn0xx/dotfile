import { DatabaseContainer } from "./container";

export class pgContainer implements DatabaseContainer {
  async configureDatabase() {
    // Configure the database
  }

  async startContainer() {
    // Start the container
  }

  async stopContainer() {
    // Stop the container
  }
}