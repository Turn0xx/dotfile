export interface DatabaseContainer {
  configureDatabase: () => Promise<void>;
  startContainer: () => Promise<void>;
  stopContainer: () => Promise<void>;
}