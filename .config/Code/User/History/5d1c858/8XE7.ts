export interface DatabaseContainer {
  configureDatabase: (configuration:) => Promise<void>;
  startContainer: () => Promise<void>;
  stopContainer: () => Promise<void>;
}