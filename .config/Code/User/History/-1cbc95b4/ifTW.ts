import { ObservableAction } from "./subject";

export type ActionType = 'add' | 'remove';


export interface Observer {
  update<T extends ObservableAction>(actionType: T, colorName: Acti): void;
}