export type ActionType = 'add' | 'remove';


export interface Observer {
  update(actionType: ActionType): void;
}