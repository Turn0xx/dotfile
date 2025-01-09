export type DbConfig = { 
  internal: boolean;
  config?: {
    database: string;
    username: string;
    password: string;
    port: number;
  }
}



export interface DatabaseContainer {
  configureDatabase: (configuration: DbConfig) => Promise<void>;
  startContainer: () => Promise<void>;
  stopContainer: () => Promise<void>;
}