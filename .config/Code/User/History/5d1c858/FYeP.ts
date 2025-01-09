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
  start: () => Promise<void>;
  stopContainer: () => Promise<void>;
}