export type ActionType = 'add' | 'remove';


export interface Observer {
  update(): void;
}