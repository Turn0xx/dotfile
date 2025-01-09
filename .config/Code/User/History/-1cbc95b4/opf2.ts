export type ActionType = 'add' | 'remove';


export interface Observer {
  update(actionType: Obser, colorName: string): void;
}