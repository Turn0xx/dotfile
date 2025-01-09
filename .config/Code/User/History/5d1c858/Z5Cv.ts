export type databaseConfig = { 
  internal: boolean;
  config?: {
    database: string;
    username: string;
    password: string;
    port: number;
  }
}



export interface DatabaseContainer {
  configureDatabase: (configuration: ) => Promise<void>;
  startContainer: () => Promise<void>;
  stopContainer: () => Promise<void>;
}