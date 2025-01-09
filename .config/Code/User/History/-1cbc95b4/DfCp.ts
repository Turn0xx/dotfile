import { ObservableAction } from "./subject";

export type ActionType = 'add' | 'remove';


export interface Observer {
  update(actionType: ObservableAction, colorName: M): void;
}